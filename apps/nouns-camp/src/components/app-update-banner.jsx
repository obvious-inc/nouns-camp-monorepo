"use client";

import React from "react";
import { css } from "@emotion/react";
import { useFetch } from "@shades/common/react";
import Link from "@shades/ui-web/link";
import { Cross as CrossIcon } from "@shades/ui-web/icons";
import Banner from "@/components/banner";

const AppUpdateBanner = () => {
  const [isDismissed, setDismissed] = React.useState(false);
  const [hasUpdate, setHasUpdate] = React.useState(false);

  useFetch(
    () =>
      fetch("/", { method: "HEAD" }).then((res) => {
        const buildId = process.env.BUILD_ID;
        const newBuildId = res.headers.get("x-camp-build-id");
        if (buildId == null || buildId === newBuildId) return;
        console.log(
          `New build available: "${newBuildId}"\nCurrently running: "${buildId}"`,
        );
        setHasUpdate(true);
      }),
    [],
  );

  const showBanner = hasUpdate && !isDismissed;

  if (!showBanner) return null;

  return (
    <div
      css={(t) =>
        css({
          position: "fixed",
          zIndex: 1,
          width: "100%",
          background: t.colors.backgroundPrimary,
        })
      }
    >
      <Banner>
        <div style={{ flex: 1, minWidth: 0 }}>
          New version of Camp available.{" "}
          <Link underline component="a" href="/">
            Click here to update
          </Link>
        </div>
        <button
          onClick={() => {
            setDismissed(true);
          }}
          style={{ padding: "0.8rem", margin: "-0.8rem", cursor: "pointer" }}
        >
          <CrossIcon
            style={{ width: "1.5rem", height: "auto", margin: "auto" }}
          />
        </button>
      </Banner>
    </div>
  );
};

export default AppUpdateBanner;
