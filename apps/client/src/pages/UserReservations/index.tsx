import apiClient from "@/api-client";

import useAuth from "@/hooks/useAuth";

import ReservationCard from "@/components/ReservationCard";

const UserReservations = () => {
  const { authHeader, userId } = useAuth();

  if (!userId) return null;

  const { data } = apiClient.reservations.findUserReservations.useQuery(
    ["user-reservations", userId],
    {
      params: { userId },
      extraHeaders: authHeader,
    }
  );

  console.log(data);

  return (
    <div className="flex flex-col gap-4 justify-center w-full items-center mt-8">
      {data?.body.map(({ event, isCancelled }) => {
        return <ReservationCard event={event} isCancelled={isCancelled} />;
      })}
    </div>
  );
};

export default UserReservations;
