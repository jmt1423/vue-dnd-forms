<script setup lang="ts">
import SingleValueValidation from "./SingleValueValidation.vue";
import SingleParamValidation from "./SingleParamValidation.vue";
import DoubleParamValidation from "./DoubleParamValidation.vue";
</script>

<template>
  <SingleValueValidation
    value="required"
    tooltip="Value is required for completion"
    label="Required"
  />
  <SingleValueValidation
    value="email"
    tooltip="Input must be a valid email address"
    label="Email"
  />
  <SingleValueValidation
    value="number"
    tooltip="Input must be a valid numeric value"
    label="Number"
  />
  <SingleParamValidation
    value="min"
    tooltip="Number must be greater or equal to the given value"
    label="Minimum"
    placeholder="0"
  />
  <SingleParamValidation
    value="max"
    label="Maximum"
    tooltip="Number must be less than or equal to the given value"
    placeholder="10"
  />
  <SingleParamValidation
    value="matches"
    tooltip="Input must match a particular value or pattern.
      If you pass multiple arguments, it checks each until a match is found"
    label="Matches"
    placeholder="Ex: one,two,three"
  />
  <SingleParamValidation
    value="starts_with"
    tooltip="Value must start with given string"
    label="Starts with"
    placeholder="Value"
  />
  <SingleParamValidation
    value="date_after"
    tooltip="Input must be after the given data"
    label="Date after"
    placeholder="YYYY-MM-DD"
  />
  <DoubleParamValidation
    value="length"
    tooltip="Number of characters must be within range."
    switch-label="Length"
    label-one="Min"
    label-two="Max"
    placeholder-one="0"
    placeholder-two="10"
  />
  <DoubleParamValidation
    value="between"
    tooltip="Number is (inclusively) between two other numbers."
    switch-label="Between"
    label-one="Min"
    label-two="Max"
    placeholder-one="0"
    placeholder-two="10"
  />
</template>
