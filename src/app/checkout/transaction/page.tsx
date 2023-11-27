"use client";
import { useSearchParams } from "next/navigation";

import Overlay from "@/app/components/Overlay";
import Page from "@/app/components/Page";
import HomeButton from "@/app/components/HomeButton";

const Transaction = ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const query = useSearchParams();
  return (
    <Page padding={"0em"}>
      <Overlay phoneNumber={query.get("phoneNumber")} sum={query.get("sum")}>
        <HomeButton />
      </Overlay>
    </Page>
  );
};

export default Transaction;
