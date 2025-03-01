'use client';

import { GoogleMap, Marker } from '@react-google-maps/api';
import { UseFormReturn } from 'react-hook-form';
import { AddressFormData } from './EditAddressForm';
import PhoneInput from 'react-phone-number-input';
import { formatPhoneToE164 } from './AddressContentHook';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 1.280293,
  lng: 103.849296,
};

interface NewAddressFormProps {
  newAddressForm: UseFormReturn<AddressFormData>;
  isLoading: boolean;
  selectedLocation: { lat: number, lng: number } | null;
  isLoaded: boolean;
  handleMapLoad: (map: google.maps.Map) => void;
  handleMapClick: (position: { lat: number; lng: number }) => void;
  handleAddNew: (data: AddressFormData) => void;
  setIsAddingNew: (isAdding: boolean) => void;
}

export default function NewAddressForm({
  newAddressForm,
  isLoading,
  selectedLocation,
  isLoaded,
  handleMapLoad,
  // handleMapClick,
  handleAddNew,
  setIsAddingNew
}: NewAddressFormProps) {
  return (
    <div className="card bg-base-200 p-4 mb-4">
      <form onSubmit={newAddressForm.handleSubmit(handleAddNew)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Label (e.g., Home, Office)"
            className={`input input-bordered w-full ${newAddressForm.formState.errors.label ? 'input-error' : ''}`}
            {...newAddressForm.register('label')}
          />
          {newAddressForm.formState.errors.label && (
            <label className="label">
              <span className="label-text-alt text-error">
                {String(newAddressForm.formState.errors.label.message)}
              </span>
            </label>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Contact Name"
            className={`input input-bordered w-full ${newAddressForm.formState.errors.name ? 'input-error' : ''}`}
            {...newAddressForm.register('name')}
          />
          {newAddressForm.formState.errors.name && (
            <label className="label">
              <span className="label-text-alt text-error">
                {String(newAddressForm.formState.errors.name.message)}
              </span>
            </label>
          )}
        </div>

        <div>
          <div className={`input input-bordered flex items-center w-full ${newAddressForm.formState.errors.phone ? 'input-error' : ''}`}>
            <PhoneInput
              placeholder="Enter phone number with country code"
              international
              defaultCountry="SG"
              value={newAddressForm.watch('phone')}
              onChange={(value) => {
                const formattedValue = value ? formatPhoneToE164(value) : '';
                newAddressForm.setValue('phone', formattedValue, { shouldValidate: true });
              }}
              className="w-full bg-transparent"
            />
          </div>
          {newAddressForm.formState.errors.phone && (
            <label className="label">
              <span className="label-text-alt text-error">
                {String(newAddressForm.formState.errors.phone.message)}
              </span>
            </label>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Postal Code"
            className={`input input-bordered w-full ${newAddressForm.formState.errors.postal_code ? 'input-error' : ''}`}
            {...newAddressForm.register('postal_code')}
          />
          {newAddressForm.formState.errors.postal_code && (
            <label className="label">
              <span className="label-text-alt text-error">
                {String(newAddressForm.formState.errors.postal_code.message)}
              </span>
            </label>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Map will be updated automatically based on postal code after several seconds</p>
          {isLoaded ? (
            <div className="h-[400px] w-full rounded-lg overflow-hidden">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={selectedLocation || defaultCenter}
                onLoad={handleMapLoad}
                // onClick={(e) => {
                //   if (e.latLng) {
                //     const lat = e.latLng.lat();
                //     const lng = e.latLng.lng();
                //     handleMapClick({ lat, lng });
                //   }
                // }}
                options={{
                  fullscreenControl: false,
                  mapTypeControl: false,
                  streetViewControl: false,
                }}
              >
                {selectedLocation ? (
                  <Marker
                    position={selectedLocation}
                    animation={google.maps.Animation.DROP}
                    label={{
                      text: "📍",
                      fontSize: "24px",
                      className: "marker-label"
                    }}
                  />
                ) : (
                  <div className="absolute top-0 left-0 right-0 bg-base-100 bg-opacity-80 text-center py-2 z-10">
                    Enter a postal code to set location
                  </div>
                )}
              </GoogleMap>
            </div>
          ) : (
            <div className="h-[400px] w-full rounded-lg bg-base-300 flex items-center justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Unit Number"
              className={`input input-bordered w-full ${newAddressForm.formState.errors.address_unit_number ? 'input-error' : ''}`}
              {...newAddressForm.register('address_unit_number')}
            />
            {newAddressForm.formState.errors.address_unit_number && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {String(newAddressForm.formState.errors.address_unit_number.message)}
                </span>
              </label>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Floor"
              className={`input input-bordered w-full ${newAddressForm.formState.errors.address_floor ? 'input-error' : ''}`}
              {...newAddressForm.register('address_floor')}
            />
            {newAddressForm.formState.errors.address_floor && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {String(newAddressForm.formState.errors.address_floor.message)}
                </span>
              </label>
            )}
          </div>
        </div>

        <textarea
          placeholder="Address"
          className={`textarea textarea-bordered w-full ${newAddressForm.formState.errors.address ? 'textarea-error' : ''}`}
          {...newAddressForm.register('address')}
        />
        {newAddressForm.formState.errors.address && (
          <div className="text-error text-sm mt-1">
            {String(newAddressForm.formState.errors.address.message)}
          </div>
        )}

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Set as primary address</span>
            <input
              type="checkbox"
              className="checkbox"
              {...newAddressForm.register('is_primary')}
            />
          </label>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2">
          <button
            type="button"
            className="btn btn-ghost w-full sm:w-auto"
            onClick={() => {
              setIsAddingNew(false);
              newAddressForm.reset();
            }}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm mr-2"></span>
            ) : null}
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
} 