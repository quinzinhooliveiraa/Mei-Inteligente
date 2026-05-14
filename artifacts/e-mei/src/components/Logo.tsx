import { useTheme } from "../hooks/useTheme";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-8 w-auto" }: LogoProps) {
  const { theme } = useTheme();
  const src = theme === "light" ? "/logo-light.png" : "/logo.png";

  return (
    <img
      src={src}
      alt="EasyMei"
      className={className}
      onError={(e) => {
        const t = e.currentTarget;
        t.onerror = null;
        t.src = theme === "light" ? "/logo.png" : "/logo-light.png";
      }}
    />
  );
}
