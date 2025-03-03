'use client';

import { formatPhoneToE164 } from '@/lib/utils';
import { Address } from '@/types/addressType';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { UseFormReturn } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 1.280293,
  lng: 103.849296,
};

// Define the schema type
export type AddressFormData = {
  label: string;
  address: string;
  address_unit_number: string | null;
  address_floor: string | null;
  phone: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  is_primary: boolean;
  name: string;
};

interface EditAddressFormProps {
  address: Address;
  editAddressForm: UseFormReturn<AddressFormData>;
  isLoading: boolean;
  selectedLocation: { lat: number, lng: number } | null;
  isLoaded: boolean;
  handleMapLoad: (map: google.maps.Map) => void;
  handleMapClick: (position: { lat: number; lng: number }) => void;
  handleSaveEdit: (data: AddressFormData) => void;
  handleCancelEdit: () => void;
}

export default function EditAddressForm({
  editAddressForm,
  isLoading,
  selectedLocation,
  isLoaded,
  handleMapLoad,
  // handleMapClick,
  handleSaveEdit,
  handleCancelEdit
}: EditAddressFormProps) {
  return (
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
            <span className="label-text-alt text-error">
              {String(editAddressForm.formState.errors.label.message)}
            </span>
          </label>
        )}
      </div>

      <div>
        <label className="label">
          <span className="label-text">Contact Name</span>
        </label>
        <input
          type="text"
          placeholder="Enter contact name..."
          className={`input input-bordered w-full ${editAddressForm.formState.errors.name ? 'input-error' : ''}`}
          {...editAddressForm.register('name')}
        />
        {editAddressForm.formState.errors.name && (
          <label className="label">
            <span className="label-text-alt text-error">
              {String(editAddressForm.formState.errors.name.message)}
            </span>
          </label>
        )}
      </div>

      <div>
        <label className="label">
          <span className="label-text">Phone</span>
        </label>
        <div className={`input input-bordered flex items-center w-full ${editAddressForm.formState.errors.phone ? 'input-error' : ''}`}>
          <PhoneInput
            placeholder="Enter phone number with country code"
            international
            defaultCountry="SG"
            value={editAddressForm.watch('phone')}
            onChange={(value) => {
              // Format to E.164 before setting value
              const formattedValue = value ? formatPhoneToE164(value) : '';
              editAddressForm.setValue('phone', formattedValue, { shouldValidate: true });
            }}
            className="w-full bg-transparent"
          />
        </div>
        {editAddressForm.formState.errors.phone && (
          <label className="label">
            <span className="label-text-alt text-error">
              {String(editAddressForm.formState.errors.phone.message)}
            </span>
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
            <span className="label-text-alt text-error">
              {String(editAddressForm.formState.errors.postal_code.message)}
            </span>
          </label>
        )}
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-2">Map will be updated automatically based on postal code</p>
        {isLoaded ? (
          <div className="h-[400px] w-full rounded-lg overflow-hidden">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={13}
              center={selectedLocation || defaultCenter}
              onLoad={handleMapLoad}
              // onClick={(e) => {
              // if (e.latLng) {
              // const lat = e.latLng.lat();
              // const lng = e.latLng.lng();
              // handleMapClick({ lat, lng });
              // }
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
          <label className="label">
            <span className="label-text">Unit Number</span>
          </label>
          <input
            type="text"
            placeholder="Unit Number"
            className={`input input-bordered w-full ${editAddressForm.formState.errors.address_unit_number ? 'input-error' : ''}`}
            {...editAddressForm.register('address_unit_number')}
          />
          {editAddressForm.formState.errors.address_unit_number && (
            <label className="label">
              <span className="label-text-alt text-error">
                {String(editAddressForm.formState.errors.address_unit_number.message)}
              </span>
            </label>
          )}
        </div>
        <div>
          <label className="label">
            <span className="label-text">Floor</span>
          </label>
          <input
            type="text"
            placeholder="Floor"
            className={`input input-bordered w-full ${editAddressForm.formState.errors.address_floor ? 'input-error' : ''}`}
            {...editAddressForm.register('address_floor')}
          />
          {editAddressForm.formState.errors.address_floor && (
            <label className="label">
              <span className="label-text-alt text-error">
                {String(editAddressForm.formState.errors.address_floor.message)}
              </span>
            </label>
          )}
        </div>
      </div>

      <textarea
        placeholder="Address"
        className={`textarea textarea-bordered w-full ${editAddressForm.formState.errors.address ? 'textarea-error' : ''}`}
        {...editAddressForm.register('address')}
      />
      {editAddressForm.formState.errors.address && (
        <div className="text-error text-sm mt-1">
          {String(editAddressForm.formState.errors.address.message)}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={handleCancelEdit}
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
  );
} 