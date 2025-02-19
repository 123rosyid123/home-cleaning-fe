'use client';

import { Plus, Pencil, Trash2, Check, MapPin, Navigation2 } from 'lucide-react';
import {
  GoogleMap,
  StandaloneSearchBox,
  useLoadScript,
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
    editingAddress,
    newAddress,
    showMap,
    selectedLocation,
    isLoading,
    setIsAddingNew,
    setEditingAddress,
    setNewAddress,
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
  } = useAddressContent();

  const LocationButtons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        className="btn btn-secondary"
        onClick={() => setShowMap(true)}
      >
        <MapPin className="w-4 h-4 mr-2" /> Select from Map
      </button>
      <button
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
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Label (e.g., Home, Office)"
                className="input input-bordered w-full"
                value={newAddress.label}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, label: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Address"
                className="input input-bordered w-full"
                value={newAddress.address}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, address: e.target.value })
                }
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="input input-bordered"
                  value={newAddress.postal_code}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, postal_code: e.target.value })
                  }
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input input-bordered"
                  value={newAddress.phone}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                />
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Set as primary address</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={newAddress.is_primary}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, is_primary: e.target.checked })
                    }
                  />
                </label>
              </div>

              <LocationButtons />
              <CoordinatesDisplay lat={newAddress.latitude} lng={newAddress.longitude} />

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
                      >
                      </GoogleMap>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <button
                  className="btn btn-ghost w-full sm:w-auto"
                  onClick={() => {
                    setIsAddingNew(false);
                    setShowMap(false);
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary w-full sm:w-auto" 
                  onClick={handleAddNew}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                  ) : null}
                  Save Address
                </button>
              </div>
            </div>
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
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">
                          <span className="label-text">Label</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Label (e.g., Home, Office)"
                          className="input input-bordered w-full"
                          value={editingAddress.label}
                          onChange={(e) =>
                            setEditingAddress({ ...editingAddress, label: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="label">
                          <span className="label-text">Phone Number</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          className="input input-bordered"
                          value={editingAddress.phone}
                          onChange={(e) =>
                            setEditingAddress({ ...editingAddress, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text">Address</span>
                      </label>
                      <textarea
                        placeholder="Address"
                        className="textarea textarea-bordered w-full"
                        value={editingAddress.address}
                        onChange={(e) =>
                          setEditingAddress({ ...editingAddress, address: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text">Postal Code</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Postal Code"
                        className="input input-bordered w-full"
                        value={editingAddress.postal_code}
                        onChange={(e) =>
                          setEditingAddress({ ...editingAddress, postal_code: e.target.value })
                        }
                      />
                    </div>

                    <LocationButtons />
                    <CoordinatesDisplay lat={editingAddress.latitude} lng={editingAddress.longitude} />

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
                            >
                            </GoogleMap>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                      <button
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
                        className="btn btn-primary" 
                        onClick={handleSaveEdit}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="loading loading-spinner loading-sm mr-2"></span>
                        ) : null}
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg">{address.label}</h3>
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