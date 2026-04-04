import React, { useState } from "react";
import Select from "react-select";
import { State, City } from "country-state-city";

const LocationSelector = ({ onSelect }) => {
  const [selectedState, setSelectedState] = useState(null);

  const states = State.getStatesOfCountry("IN");

  const stateOptions = states.map((s) => ({
    value: s.isoCode,
    label: s.name,
  }));

  const cityOptions = selectedState
    ? City.getCitiesOfState("IN", selectedState.value).map((c) => ({
        value: c.name,
        label: c.name,
      }))
    : [];

  return (
    <div className="grid md:grid-cols-2 gap-4">

      <Select
        options={stateOptions}
        placeholder="Select State"
        onChange={(val) => {
          setSelectedState(val);
          onSelect({ state: val.label });
        }}
      />

      <Select
        options={cityOptions}
        placeholder="Search District 🔍"
        isDisabled={!selectedState}
        onChange={(val) =>
          onSelect({
            state: selectedState.label,
            district: val.value,
          })
        }
      />
    </div>
  );
};

export default LocationSelector;