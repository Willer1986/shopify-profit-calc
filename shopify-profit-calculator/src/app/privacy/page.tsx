export const metadata = {
  title: "Privacy Policy | Shopify Profit Calc",
  description:
    "Privacy Policy for Shopify Profit Calc — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      {/* Language toggle hint */}
      <p className="text-sm text-gray-400 mb-8">
        🇬🇧 English below &mdash;{" "}
        <a href="#french" className="underline hover:text-gray-600">
          🇫🇷 Français plus bas
        </a>
      </p>

      {/* ───────────────────── ENGLISH ───────────────────── */}
      <section id="english">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">
          Last updated: March 23, 2026 &nbsp;·&nbsp; Contact:{" "}
          <a
            href="mailto:shoppifycalculatorprofit@gmail.com"
            className="underline"
          >
            shoppifycalculatorprofit@gmail.com
          </a>
        </p>

        <Section title="1. Introduction">
          Shopify Profit Calc (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;) operates shopifyprofit.com. This Privacy Policy
          explains how we collect, use, and protect your information when you
          use our service. By using Shopify Profit Calc, you agree to the
          collection and use of information in accordance with this policy.
        </Section>

        <Section title="2. Information We Collect">
          <p>
            <strong>Account data:</strong> When you register, we collect your
            email address and a hashed password. We do not store plain-text
            passwords.
          </p>
          <p className="mt-3">
            <strong>Calculator data:</strong> All calculator inputs (selling
            price, costs, fees) are processed client-side in your browser. We
            do not transmit or store your financial inputs unless you are a Pro
            user who explicitly saves calculation history.
          </p>
          <p className="mt-3">
            <strong>Payment data:</strong> Payments are processed by Stripe,
            Inc. We never store your credit card number or payment details on
            our servers.
          </p>
          <p className="mt-3">
            <strong>Usage data:</strong> We may collect anonymized usage
            statistics (page views, feature usage) to improve the service.
          </p>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use collected data to:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Authenticate your account</li>
            <li>
              Send transactional emails (password reset, subscription
              confirmation)
            </li>
            <li>Provide Pro features (saved history, CSV export)</li>
            <li>Improve our service</li>
          </ul>
          <p className="mt-3">
            We do not sell, rent, or share your personal data with third
            parties for marketing purposes.
          </p>
        </Section>

        <Section title="4. Cookies">
          We use a single secure session cookie for authentication. We do not
          use third-party tracking cookies or advertising cookies. You may
          disable cookies in your browser, but this will prevent you from
          logging in.
        </Section>

        <Section title="5. Data Retention">
          Account data is retained for as long as your account is active. Pro
          calculation history is retained for 12 months or until you delete it.
          If you delete your account, all associated data is permanently removed
          within 30 days.
        </Section>

        <Section title="6. Data Security">
          We store data on secure servers in the United States. We use
          industry-standard encryption (TLS/HTTPS) for all data in transit.
          Passwords are hashed using bcrypt. We conduct regular security
          reviews.
        </Section>

        <Section title="7. GDPR & Your Rights (EU/EEA Users)">
          <p>
            If you are located in the EU or EEA, you have the following rights:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Right to access your data</li>
            <li>Right to rectification</li>
            <li>Right to erasure (&ldquo;right to be forgotten&rdquo;)</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, email{" "}
            <a
              href="mailto:shoppifycalculatorprofit@gmail.com"
              className="underline"
            >
              shoppifycalculatorprofit@gmail.com
            </a>
            . We will respond within 30 days.
          </p>
        </Section>

        <Section title="8. CCPA (California Users)">
          California residents may request disclosure of personal information we
          collect, use, disclose, or sell. We do not sell personal information.
          To submit a request, email{" "}
          <a
            href="mailto:shoppifycalculatorprofit@gmail.com"
            className="underline"
          >
            shoppifycalculatorprofit@gmail.com
          </a>
          .
        </Section>

        <Section title="9. Children's Privacy">
          Shopify Profit Calc is not directed to children under 13. We do not
          knowingly collect personal information from children. If you believe
          we have inadvertently collected such information, please contact us
          immediately.
        </Section>

        <Section title="10. Third-Party Services">
          <p>We use the following third-party services:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              <a href="https://stripe.com/privacy" className="underline">
                Stripe
              </a>{" "}
              — payments
            </li>
            <li>
              <a
                href="https://vercel.com/legal/privacy-policy"
                className="underline"
              >
                Vercel
              </a>{" "}
              — hosting
            </li>
            <li>
              <a href="https://neon.tech/privacy" className="underline">
                Neon
              </a>{" "}
              — database
            </li>
          </ul>
          <p className="mt-3">
            Each service has its own privacy policy.
          </p>
        </Section>

        <Section title="11. Changes to This Policy">
          We may update this Privacy Policy from time to time. We will notify
          registered users by email of material changes. Continued use of the
          service after changes constitutes acceptance.
        </Section>

        <Section title="12. Contact">
          <p>Questions about this Privacy Policy?</p>
          <p className="mt-2">
            Email:{" "}
            <a
              href="mailto:shoppifycalculatorprofit@gmail.com"
              className="underline"
            >
              shoppifycalculatorprofit@gmail.com
            </a>
          </p>
          <p className="mt-1">
            Website:{" "}
            <a href="https://shopifyprofit.com/contact" className="underline">
              shopifyprofit.com/contact
            </a>
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Shopify Profit Calc is not affiliated with Shopify Inc.
          </p>
        </Section>
      </section>

      <hr className="my-16 border-gray-200" />

      {/* ───────────────────── FRANÇAIS ───────────────────── */}
      <section id="french">
        <h1 className="text-3xl font-bold mb-2">
          Politique de Confidentialité
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Dernière mise à jour : 23 mars 2026 &nbsp;·&nbsp; Contact :{" "}
          <a
            href="mailto:shoppifycalculatorprofit@gmail.com"
            className="underline"
          >
            shoppifycalculatorprofit@gmail.com
          </a>
        </p>

        <Section title="1. Introduction">
          Shopify Profit Calc (« nous ») exploite shopifyprofit.com. Cette
          politique de confidentialité explique comment nous collectons,
          utilisons et protégeons vos informations lorsque vous utilisez notre
          service.
        </Section>

        <Section title="2. Informations collectées">
          <p>
            <strong>Données de compte :</strong> adresse e-mail et mot de passe
            haché. Nous ne stockons jamais les mots de passe en clair.
          </p>
          <p className="mt-3">
            <strong>Données du calculateur :</strong> tous les calculs sont
            traités côté client dans votre navigateur. Nous ne transmettons pas
            vos données financières, sauf si vous êtes utilisateur Pro et
            sauvegardez votre historique.
          </p>
          <p className="mt-3">
            <strong>Données de paiement :</strong> les paiements sont traités
            par Stripe. Nous ne stockons jamais vos informations bancaires.
          </p>
        </Section>

        <Section title="3. Utilisation de vos données">
          <p>Nous utilisons vos données pour :</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Authentifier votre compte</li>
            <li>Envoyer des e-mails transactionnels</li>
            <li>Fournir les fonctionnalités Pro</li>
            <li>Améliorer notre service</li>
          </ul>
          <p className="mt-3">
            Nous ne vendons pas vos données à des tiers.
          </p>
        </Section>

        <Section title="4. Cookies">
          Nous utilisons un seul cookie de session sécurisé pour
          l&apos;authentification. Aucun cookie de suivi ou publicitaire tiers
          n&apos;est utilisé.
        </Section>

        <Section title="5. Conservation des données">
          Les données de compte sont conservées tant que votre compte est actif.
          L&apos;historique Pro est conservé 12 mois. En cas de suppression de
          compte, toutes les données sont effacées sous 30 jours.
        </Section>

        <Section title="6. Vos droits (RGPD)">
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Droit d&apos;accès</li>
            <li>Droit de rectification</li>
            <li>Droit à l&apos;effacement</li>
            <li>Droit à la portabilité</li>
            <li>Droit d&apos;opposition</li>
          </ul>
          <p className="mt-3">
            Pour exercer ces droits :{" "}
            <a
              href="mailto:shoppifycalculatorprofit@gmail.com"
              className="underline"
            >
              shoppifycalculatorprofit@gmail.com
            </a>
            . Nous répondrons sous 30 jours.
          </p>
        </Section>

        <Section title="7. Sécurité">
          Toutes les données sont chiffrées via TLS/HTTPS. Les mots de passe
          sont hachés avec bcrypt. Les données sont hébergées sur des serveurs
          sécurisés aux États-Unis.
        </Section>

        <Section title="8. Services tiers">
          <p>Nous utilisons :</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Stripe — paiements</li>
            <li>Vercel — hébergement</li>
            <li>Neon — base de données</li>
          </ul>
          <p className="mt-3">
            Chaque service dispose de sa propre politique de confidentialité.
          </p>
        </Section>

        <Section title="9. Contact">
          <p>
            Questions ? Écrivez à :{" "}
            <a
              href="mailto:shoppifycalculatorprofit@gmail.com"
              className="underline"
            >
              shoppifycalculatorprofit@gmail.com
            </a>
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Shopify Profit Calc n&apos;est pas affilié à Shopify Inc.
          </p>
        </Section>
      </section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="text-gray-700 leading-relaxed text-sm">{children}</div>
    </div>
  );
}
