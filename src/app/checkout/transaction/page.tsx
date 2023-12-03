"use client";
import { useSearchParams } from "next/navigation";

import Page from "@/app/shared/components/Page";
import Overlay from "@/app/shared/components/Overlay";
import HomeButton from "@/app/shared/components/HomeButton";

const Transaction = () => {
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
