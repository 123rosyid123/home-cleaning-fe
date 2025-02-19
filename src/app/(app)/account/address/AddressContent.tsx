'use client';

import { Plus, Pencil, Trash2, Check, MapPin, Navigation2 } from 'lucide-react';
import {
  GoogleMap,
  StandaloneSearchBox,
  useLoadScript,
  Marker,
} from '@react-google-maps/api';
import { useAddressContent, libraries } from './AddressContentHook';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
};

export default function AddressContent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const {
    addresses,
    isAddingNew,
    editingId,
    showMap,
    selectedLocation,
    isLoading,
    newAddressForm,
    editAddressForm,
    setIsAddingNew,
    setShowMap,
    handleMapLoad,
    handleSearchBoxLoad,
    handlePlacesChanged,
    handleGetCurrentLocation,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleAddNew,
    handleDelete,
    handleSetPrimary,
    handleMapClick,
  } = useAddressContent();

  const LocationButtons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        type='button'
        className="btn btn-secondary"
        onClick={() => setShowMap(true)}
      >
        <MapPin className="w-4 h-4 mr-2" /> Select from Map
      </button>
      <button
        type='button'
        className="btn btn-secondary"
        onClick={handleGetCurrentLocation}
      >
        <Navigation2 className="w-4 h-4 mr-2" /> Use GPS Location
      </button>
    </div>
  );

  const CoordinatesDisplay = ({ lat, lng }: { lat: number | null, lng: number | null }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="label">
          <span className="label-text">Latitude</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={lat?.toFixed(6) || 'Not set'}
          readOnly
        />
      </div>
      <div>
        <label className="label">
          <span className="label-text">Longitude</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={lng?.toFixed(6) || 'Not set'}
          readOnly
        />
      </div>
    </div>
  );

  const MapControls = () => (
    <div className="space-y-4">
      {isLoaded && (
        <StandaloneSearchBox
          onLoad={handleSearchBoxLoad}
          onPlacesChanged={handlePlacesChanged}
        >
          <input
            type="text"
            placeholder="Search for a location, then click on the map to select"
            className="input input-bordered w-full"
          />
        </StandaloneSearchBox>
      )}
    </div>
  );

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">My Addresses</h2>
          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={() => setIsAddingNew(true)}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            Add New Address
          </button>
        </div>

        {isAddingNew && (
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
                    <span className="label-text-alt text-error">{newAddressForm.formState.errors.label.message}</span>
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
                    <span className="label-text-alt text-error">{newAddressForm.formState.errors.name.message}</span>
                  </label>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className={`input input-bordered w-full ${newAddressForm.formState.errors.phone ? 'input-error' : ''}`}
                  {...newAddressForm.register('phone')}
                />
                {newAddressForm.formState.errors.phone && (
                  <label className="label">
                    <span className="label-text-alt text-error">{newAddressForm.formState.errors.phone.message}</span>
                  </label>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Address"
                  className={`textarea textarea-bordered w-full ${newAddressForm.formState.errors.address ? 'textarea-error' : ''}`}
                  {...newAddressForm.register('address')}
                />
                {newAddressForm.formState.errors.address && (
                  <label className="label">
                    <span className="label-text-alt text-error">{newAddressForm.formState.errors.address.message}</span>
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
                    <span className="label-text-alt text-error">{newAddressForm.formState.errors.postal_code.message}</span>
                  </label>
                )}
              </div>
              
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

              <LocationButtons />
              <CoordinatesDisplay lat={selectedLocation?.lat || null} lng={selectedLocation?.lng || null} />

              {showMap && (
                <div className="space-y-4">
                  <MapControls />
                  {isLoaded && (
                    <div className="h-[400px] w-full rounded-lg overflow-hidden">
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={13}
                        center={selectedLocation || defaultCenter}
                        onLoad={handleMapLoad}
                        onClick={(e) => {
                          if (e.latLng) {
                            const lat = e.latLng.lat();
                            const lng = e.latLng.lng();
                            handleMapClick({ lat, lng });
                          }
                        }}
                      >
                        {selectedLocation && (
                          <Marker
                            position={selectedLocation}
                          />
                        )}
                      </GoogleMap>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-ghost w-full sm:w-auto"
                  onClick={() => {
                    setIsAddingNew(false);
                    setShowMap(false);
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
        )}

        <div className="space-y-4">
          {isLoading && addresses.length === 0 ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-8 text-base-content/70">
              No addresses found. Add your first address!
            </div>
          ) : (
            addresses.map((address) => (
              <div
                key={address.id}
                className="card bg-base-200 p-4 hover:bg-base-300 transition-colors"
              >
                {editingId === address.id ? (
                  <form onSubmit={editAddressForm.handleSubmit(handleSaveEdit)} className="space-y-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Label</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Label (e.g., Home, Office)"
                        className={`input input-bordered w-full ${editAddressForm.formState.errors.label ? 'input-error' : ''}`}
                        {...editAddressForm.register('label')}
                      />
                      {editAddressForm.formState.errors.label && (
                        <label className="label">
                          <span className="label-text-alt text-error">{editAddressForm.formState.errors.label.message}</span>
                        </label>
                      )}
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Contact Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Contact Name"
                        className={`input input-bordered w-full ${editAddressForm.formState.errors.name ? 'input-error' : ''}`}
                        {...editAddressForm.register('name')}
                      />
                      {editAddressForm.formState.errors.name && (
                        <label className="label">
                          <span className="label-text-alt text-error">{editAddressForm.formState.errors.name.message}</span>
                        </label>
                      )}
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className={`input input-bordered w-full ${editAddressForm.formState.errors.phone ? 'input-error' : ''}`}
                        {...editAddressForm.register('phone')}
                      />
                      {editAddressForm.formState.errors.phone && (
                        <label className="label">
                          <span className="label-text-alt text-error">{editAddressForm.formState.errors.phone.message}</span>
                        </label>
                      )}
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Address</span>
                      </label>
                      <textarea
                        placeholder="Address"
                        className={`textarea textarea-bordered w-full ${editAddressForm.formState.errors.address ? 'textarea-error' : ''}`}
                        {...editAddressForm.register('address')}
                      />
                      {editAddressForm.formState.errors.address && (
                        <label className="label">
                          <span className="label-text-alt text-error">{editAddressForm.formState.errors.address.message}</span>
                        </label>
                      )}
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Postal Code</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Postal Code"
                        className={`input input-bordered w-full ${editAddressForm.formState.errors.postal_code ? 'input-error' : ''}`}
                        {...editAddressForm.register('postal_code')}
                      />
                      {editAddressForm.formState.errors.postal_code && (
                        <label className="label">
                          <span className="label-text-alt text-error">{editAddressForm.formState.errors.postal_code.message}</span>
                        </label>
                      )}
                    </div>

                    <LocationButtons />
                    <CoordinatesDisplay lat={selectedLocation?.lat || null} lng={selectedLocation?.lng || null} />

                    {showMap && (
                      <div className="space-y-4">
                        <MapControls />
                        {isLoaded && (
                          <div className="h-[400px] w-full rounded-lg overflow-hidden">
                            <GoogleMap
                              mapContainerStyle={mapContainerStyle}
                              zoom={13}
                              center={selectedLocation || defaultCenter}
                              onLoad={handleMapLoad}
                              onClick={(e) => {
                                if (e.latLng) {
                                  const lat = e.latLng.lat();
                                  const lng = e.latLng.lng();
                                  handleMapClick({ lat, lng });
                                }
                              }}
                            >
                              {selectedLocation && (
                                <Marker
                                  position={selectedLocation}
                                />
                              )}
                            </GoogleMap>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => {
                          handleCancelEdit();
                          setShowMap(false);
                        }}
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="btn btn-primary" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="loading loading-spinner loading-sm mr-2"></span>
                        ) : null}
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg">{address.label}</h3>
                      <p className="text-base-content/70">Contact: {address.name}</p>
                      <p className="text-base-content/70">{address.address}</p>
                      <p className="text-base-content/70">
                        Postal Code: {address.postal_code}
                      </p>
                      <p className="text-base-content/70">
                        Phone: {address.phone}
                      </p>
                      <p className="text-base-content/70">
                        Coordinates: {address.latitude?.toFixed(6)}, {address.longitude?.toFixed(6)}
                      </p>
                      {address.is_primary && (
                        <span className="badge badge-primary mt-2">Primary</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      {!address.is_primary && (
                        <button
                          className="btn btn-ghost btn-sm w-full sm:w-auto"
                          onClick={() => handleSetPrimary(address.id)}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                          Set as Primary
                        </button>
                      )}
                      <div className="flex gap-2 w-full sm:w-auto justify-end">
                        <button 
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleStartEdit(address)}
                          disabled={isLoading}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          className="btn btn-ghost btn-sm text-error"
                          onClick={() => handleDelete(address.id)}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 