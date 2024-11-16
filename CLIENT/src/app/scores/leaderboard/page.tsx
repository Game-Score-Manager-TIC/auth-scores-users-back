"use client";

import LeaderBoard from "client/components/scores/leaderboard";
import { LatestInvoicesSkeleton } from "client/components/ui/skeletons";
import { fetchTopFiveScores, selecAllScores, selecTopFiveScores } from "client/redux/features/scores";
import { useAppDispatch, useAppSelector } from "client/redux/hooks";
import { Suspense, useEffect } from "react";

const PageLeaderBoard = () => {

  const scores = useAppSelector(selecTopFiveScores);


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTopFiveScores())
  }, [dispatch]);


  return (
    <div>
      <Suspense fallback={<LatestInvoicesSkeleton />}>
        <LeaderBoard data={scores} />
      </Suspense>
    </div>
  );
};

export default PageLeaderBoard;
