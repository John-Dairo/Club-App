import { InfoIcon, XIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const eventData = [
  {
    id: 1,
    title: "UTD VOLLEYBALL GAME",
    description: "Oct 13, 2025 6v6 Coed Volleyball game",
  },
  {
    id: 2,
    title: "Tech Startup Presentation",
    description: "Oct 12, 2025, Learn about how to start a startup",
  },
];

export const ReportedEvents = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-w-[375px] min-h-[812px] flex flex-col">
      <header className="relative w-full h-11">
        <img
          className="w-full h-full object-cover"
          alt="Status bar"
          src="/figmaAssets/status-bar.svg"
        />
      </header>

      <nav className="px-[26px] py-6">
        <Button variant="ghost" size="icon" className="h-auto p-0">
          <img
            className="w-[26px] h-[22px]"
            alt="Arrow"
            src="/figmaAssets/arrow-2.svg"
          />
        </Button>
      </nav>

      <main className="flex flex-col px-[19px] gap-6">
        <h1 className="px-[7px] [font-family:'Inter',Helvetica] font-semibold text-black text-[35px] tracking-[0] leading-[52.5px]">
          Reported Events
        </h1>

        <div className="relative">
          <Input
            type="text"
            placeholder="Search event or organizer"
            defaultValue=""
            className="w-full h-auto px-4 py-3 pr-10 rounded-full border-[#d9d9d9] font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-[#1e1e1e] text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] [font-style:var(--single-line-body-base-font-style)]"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-auto w-auto p-2"
          >
            <XIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          {eventData.map((event) => (
            <div key={event.id} className="flex flex-col gap-3">
              <Card className="w-full max-w-[267px] mx-auto border-[#757575]">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <InfoIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1 flex-1">
                      <h3 className="font-body-strong font-[number:var(--body-strong-font-weight)] text-[#1e1e1e] text-[length:var(--body-strong-font-size)] tracking-[var(--body-strong-letter-spacing)] leading-[var(--body-strong-line-height)] [font-style:var(--body-strong-font-style)]">
                        {event.title}
                      </h3>
                      <p className="font-body-base font-[number:var(--body-base-font-weight)] text-[#1e1e1e] text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)]">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3 justify-center">
                <Button className="h-auto px-2 py-2 bg-[#2c2c2c] hover:bg-[#2c2c2c]/90 rounded-lg font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-neutral-100 text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] [font-style:var(--single-line-body-base-font-style)]">
                  Disable Event
                </Button>
                <Button className="h-auto px-2 py-2 bg-[#2c2c2c] hover:bg-[#2c2c2c]/90 rounded-lg font-single-line-body-base font-[number:var(--single-line-body-base-font-weight)] text-neutral-100 text-[length:var(--single-line-body-base-font-size)] tracking-[var(--single-line-body-base-letter-spacing)] leading-[var(--single-line-body-base-line-height)] [font-style:var(--single-line-body-base-font-style)]">
                  Review Report
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
