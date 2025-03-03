'use client';

import { useLoadScript } from '@react-google-maps/api';
import { Check, Pencil, Plus, Trash2 } from 'lucide-react';
import { libraries, useAddressContent } from './AddressContentHook';
import EditAddressForm from './EditAddressForm';
import NewAddressForm from './NewAddressForm';

export default function AddressContent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const {
    addresses,
    isAddingNew,
    editingId,
    selectedLocation,
    isLoading,
    addressToDelete,
    newAddressForm,
    editAddressForm,
    setIsAddingNew,
    handleAddNewClick,
    setAddressToDelete,
    handleMapLoad,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleAddNew,
    handleDelete,
    handleSetPrimary,
    handleMapClick,
  } = useAddressContent();

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row-reverse items-start sm:items-center gap-4 mb-6">
          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={handleAddNewClick} // Use the new handler instead of directly setting isAddingNew
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
          <NewAddressForm
            newAddressForm={newAddressForm}
            isLoading={isLoading}
            selectedLocation={selectedLocation}
            isLoaded={isLoaded}
            handleMapLoad={handleMapLoad}
            handleMapClick={handleMapClick}
            handleAddNew={handleAddNew}
            setIsAddingNew={setIsAddingNew}
          />
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
                  <EditAddressForm
                    address={address}
                    editAddressForm={editAddressForm}
                    isLoading={isLoading}
                    selectedLocation={selectedLocation}
                    isLoaded={isLoaded}
                    handleMapLoad={handleMapLoad}
                    handleMapClick={handleMapClick}
                    handleSaveEdit={handleSaveEdit}
                    handleCancelEdit={handleCancelEdit}
                  />
                ) : (
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg">{address.label}</h3>
                      <p className="text-base-content/70">Contact: {address.name}</p>
                      {address.address_unit_number && address.address_floor && (
                        <p className="text-base-content/70">
                          Unit: {address.address_unit_number}, Floor: {address.address_floor}
                        </p>
                      )}
                      <p className="text-base-content/70">
                        Postal Code: {address.postal_code}
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
                          onClick={() => setAddressToDelete(address.id)}
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

      {/* Delete Confirmation Modal */}
      {addressToDelete && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-200 border border-base-300 rounded-lg shadow-lg">
            <h2 className="font-bold text-lg">Delete Address</h2>
            <p className="mt-2">Are you sure you want to delete this address?</p>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setAddressToDelete(null)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={() => {
                  if (addressToDelete) {
                    handleDelete(addressToDelete);
                  }
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                ) : null}
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}