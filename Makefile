IMAGE_NAME=eadevhydrogen01.azurecr.io/homecleaning-sg
DOCKERFILE=./Dockerfile
VERSION ?= latest

# Example Command: make publish-image VERSION="latest"

publish-image:
	echo "Build Parallel base image..."
	$(foreach tag, $(VERSION), \
		make -j 2 deploy-image-multiarch tag=$(tag); \
		docker manifest rm $(IMAGE_NAME):$(tag) || true; \
		docker manifest create $(IMAGE_NAME):$(tag) \
			--amend $(IMAGE_NAME):$(tag)-amd64 \
			--amend $(IMAGE_NAME):$(tag)-arm64; \
		docker manifest push $(IMAGE_NAME):$(tag); \
		docker rmi $(IMAGE_NAME):$(tag)-amd64 $(IMAGE_NAME):$(tag)-arm64; \
	)

deploy-image-multiarch:
	make deploy-amd64 tag=$(tag) &
	make deploy-arm64 tag=$(tag) &
	wait

deploy-amd64:
	echo "Deploying amd64 image for " $(tag)
	$(call build_and_push,$(tag),amd64)


deploy-arm64:
	echo "Deploying arm64 image for " $(tag)
	$(call build_and_push,$(tag),arm64)


define build_and_push
	@docker buildx build \
		--tag $(IMAGE_NAME):$1-$2 \
		--platform linux/$2 \
		--load \
		-f $(DOCKERFILE) \
		.
	@docker push $(IMAGE_NAME):$1-$2
endef

# Updated command: make buildx-push VERSION="latest,v1.0.0"
buildx-push:
	@echo "Building and pushing multi-arch image with buildx..."
	@TAGS=""; \
	for tag in $$(echo $(VERSION) | tr "," " "); do \
		TAGS="$$TAGS --tag $(IMAGE_NAME):$$tag"; \
	done; \
	docker buildx build \
		$$TAGS \
		--platform linux/amd64,linux/arm64 \
		--push \
		-f $(DOCKERFILE) \
		.