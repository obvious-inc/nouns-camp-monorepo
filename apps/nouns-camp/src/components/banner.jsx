import { css } from "@emotion/react";

const Banner = ({ children }) => (
  <div
    css={(t) =>
      css({
        color: t.colors.textAccent,
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
        padding: "0.8rem 1.2rem",
        background: t.colors.primaryTransparent,
        fontSize: t.text.sizes.small,
        minHeight: "3.8rem",
      })
    }
  >
    {children}
  </div>
);

export default Banner;
