<script setup lang="ts">
import type { Car } from "../common/models/car.ts";
import type { DriveOption } from "../common/models/driveOption.ts";
import type { Winner } from "../common/models/winner.ts";
import { useGarageStore } from "../store/garageStore.ts";
import { useWinnersStore } from "../store/winnersStorage.ts";
import { storeToRefs } from "pinia";
import { reactive, watch } from "vue";

interface AnimationOptions {
  animation: string;
  animationPlayState: string;
  backgroundColor?: string;
}

const props = defineProps<Car>();

const garageStore = useGarageStore();
const winnersStore = useWinnersStore();

const { driveOptions, carDriveStatus } = storeToRefs(garageStore);
const { winners } = storeToRefs(winnersStore);

const carStyles = reactive<AnimationOptions>({
  animation: `0s`,
  animationPlayState: "running",
  backgroundColor: `${props.color}`,
});

function winnerDoesntExist(driveOption: DriveOption) {
  const createWinnerData = {
    time: driveOption.time,
    id: driveOption.id,
    wins: 1,
  };
  winnersStore.createWinner(createWinnerData);
}

function updateExistingWinner(winnerData: Winner, driveOption: DriveOption) {
  const updateWinnerData = {
    time: driveOption.time,
    wins: winnerData.wins + 1,
  };
  winnersStore.updateWinner(winnerData.id, updateWinnerData);
}

watch(carDriveStatus, () => winnersStore.getWinner(props.id));

watch(
  () => driveOptions,
  (newDriveOptions) => {
    const driveOption = newDriveOptions.value.find(
      (options) => options.id === props.id,
    );
    const winnerData = winners.value.find((item) => item.id === props.id);

    if (!driveOption?.driveStatus) {
      return;
    }

    if (!winnerData && driveOption) {
      winnerDoesntExist(driveOption);
      return;
    }

    if (winnerData && driveOption) {
      updateExistingWinner(winnerData, driveOption);
    }
  },
  { deep: true },
);

function setAnimation(driveOption: DriveOption) {
  if (driveOption.startedStatus) {
    carStyles.animation = `drive ${driveOption.time}ms forwards`;
    carStyles.animationPlayState = "running";
    return;
  }
  carStyles.animationPlayState = "paused";
}

function resetAnimation(driveOption: DriveOption) {
  if (!driveOption.resetStatus) {
    return;
  }
  carStyles.animation = "";
}

watch(
  () => driveOptions.value,
  (newDriveOptions) => {
    const driveOption = newDriveOptions.find(
      (options) => options.id === props.id,
    );

    if (!driveOption) {
      return;
    }

    setAnimation(driveOption);
    resetAnimation(driveOption);
  },
  { deep: true },
);
</script>

<template>
  <div class="race-wrapper">
    <div class="car-control">
      <div class="car-customization">
        <button
          class="select-car"
          @click.permit="garageStore.selectCar(props.id)"
        >
          select
        </button>
        <button
          class="remove-car"
          @click.permit="garageStore.deleteCar(props.id)"
        >
          remove
        </button>
      </div>

      <div class="car-race-cntrol">
        <button class="start" @click.permit="garageStore.startEngine(props.id)">
          a
        </button>
        <button class="stop" @click.permit="garageStore.stopEngine(props.id)">
          b
        </button>
      </div>
    </div>
    <div class="road">
      <div class="car" :style="carStyles"></div>
      <p>{{ props.name }}</p>
    </div>
  </div>
</template>

<style scoped>
.race-wrapper {
  display: flex;
  align-items: center;

  .car-control {
    display: flex;
    gap: 10px;
  }

  .road {
    width: 100%;
    position: relative;
    left: 0;
    top: 0;

    .car {
      width: 20px;
      height: 20px;
      position: absolute;
    }
  }
}
</style>
