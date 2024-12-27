import { TReservationWithEvent } from "api-contract";

export const enum EStatus {
  UPCOMING = "nadchodząca",
  CANCELLED = "anulowana",
  FINISHED = "zakończona",
}

export const enum EFilters {
  ALL = "wszystkie",
  UPCOMING = EStatus.UPCOMING,
  FINISHED = EStatus.FINISHED,
  CANCELLED = EStatus.CANCELLED,
}

export type TReservationWithStatus = TReservationWithEvent & {
  status: EStatus;
  month: string;
  day: string;
  hour: string;
};
