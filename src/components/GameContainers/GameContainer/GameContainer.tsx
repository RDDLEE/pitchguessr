import { Card } from "@mantine/core";
import React from "react";

export default function GameContainer({ children }: Readonly<{ children: React.ReactNode; }>): JSX.Element {
  return (
    <div className="flex w-full flex-col flex-wrap items-center justify-start">
      <Card
        className="w-full sm:w-[400px]"
        withBorder={true}
        shadow="xl"
        p="md"
      >
        <div className="flex w-full flex-col flex-wrap items-center justify-start gap-2">
          {children}
        </div>
      </Card>
    </div>
  );
}
