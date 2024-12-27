export const enum EStatus {
  UPCOMING = "nadchodząca",
  CANCELLED = "anulowana",
  FINISHED = "zakończona",
}

export const enum EFilters {
  ALL = "ALL",
  UPCOMING = EStatus.UPCOMING,
  FINISHED = EStatus.FINISHED,
  CANCELLED = EStatus.CANCELLED,
}
