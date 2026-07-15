import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms for using ${site.name}.`,
};

export default function Terms() {
  return (
    <>
      <Nav />
      <main className="prose">
        <Link href="/" className="backlink">← Back to home</Link>
        <h1>Terms of Service</h1>
        <p className="updated">{site.name} · Effective 14 July 2026</p>

        <p className="lead">
          Welcome to {site.name}. By creating an account or using the app, you agree to these
          terms. They’re written to keep campus communities useful and safe.
        </p>

        <h2>1. Who can use {site.name}</h2>
        <p>
          {site.name} is for university students and users aged 13 and above. You’re
          responsible for the account you create and for keeping your sign-in secure.
        </p>

        <h2>2. Your content</h2>
        <p>
          You own the messages, media and materials you share. By posting in a community, you
          grant {site.name} the limited licence needed to store and display that content to
          the people you shared it with. Don’t upload anything you don’t have the right to
          share.
        </p>

        <h2>3. Community rules</h2>
        <p>The following are not allowed on {site.name}:</p>
        <ul>
          <li>Harassment, hate speech, threats or bullying of other students.</li>
          <li>Spam, scams, or impersonating a school, class rep or another person.</li>
          <li>Sexually explicit content, or any content that endangers minors.</li>
          <li>Sharing material that infringes someone else’s copyright.</li>
          <li>Attempting to break, overload or reverse-engineer the service.</li>
        </ul>
        <p>
          Class reps and administrators may moderate content within their communities, and we
          may remove content or suspend accounts that break these rules.
        </p>

        <h2>4. Academic materials</h2>
        <p>
          Course materials are shared by students for study purposes. {site.name} doesn’t
          verify ownership of every upload — if something infringes your rights, contact us
          and we’ll review and remove it.
        </p>

        <h2>5. Availability</h2>
        <p>
          We work to keep {site.name} running smoothly, but the service is provided “as is”
          without warranties. We aren’t liable for indirect or incidental damages arising from
          your use of the app, to the extent permitted by law.
        </p>

        <h2>6. Ending your use</h2>
        <p>
          You can delete your account anytime from Profile → Settings. We may suspend or close
          accounts that violate these terms or put the community at risk.
        </p>

        <h2>7. Changes</h2>
        <p>
          We may update these terms as {site.name} grows. Material changes will be posted here
          with a new effective date.
        </p>

        <hr />
        <p>
          Questions about these terms? Email{" "}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
