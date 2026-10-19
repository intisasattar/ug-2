import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "Page Not Found | UG Global", robots: { index: false } };

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      lines={["This Page Could", "Not Be Found."]}
      lede={<p>The page you were looking for may have moved. Please use the navigation or return to the homepage.</p>}
      actions={
        <Button href="/" onDark>
          Return Home
        </Button>
      }
    />
  );
}
