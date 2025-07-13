import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Last updated: January 1, 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using The Pitch Deck platform
              (&quot;Service&quot;), you accept and agree to be bound by the
              terms and provision of this agreement. If you do not agree to
              abide by the above, please do not use this service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              The Pitch Deck is a platform that connects high school students
              with business case competitions. We provide tools for discovering
              competitions, submitting applications, and hosting events. The
              service is provided &quot;as is&quot; and we reserve the right to
              modify or discontinue the service at any time.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              To access certain features of the Service, you must create an
              account. You are responsible for:
            </p>
            <ul>
              <li>
                Maintaining the confidentiality of your account credentials
              </li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information</li>
              <li>Updating your information to keep it current</li>
            </ul>

            <h2>4. User Conduct</h2>
            <p>You agree not to use the Service to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>Submit false or misleading information</li>
              <li>Engage in any form of harassment or discrimination</li>
              <li>Attempt to gain unauthorized access to the platform</li>
              <li>Interfere with the proper functioning of the Service</li>
            </ul>

            <h2>5. Competition Rules</h2>
            <p>When participating in competitions through our platform:</p>
            <ul>
              <li>You must be a current high school student (grades 9-12)</li>
              <li>All work submitted must be original and your own</li>
              <li>
                You must comply with specific competition rules and deadlines
              </li>
              <li>
                Prize distribution is subject to verification of eligibility
              </li>
              <li>
                We reserve the right to disqualify participants for rule
                violations
              </li>
            </ul>

            <h2>6. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality
              are owned by The Pitch Deck and are protected by international
              copyright, trademark, patent, trade secret, and other intellectual
              property laws.
            </p>
            <p>
              By submitting content to competitions, you grant us a
              non-exclusive license to use, display, and distribute your
              submissions for promotional and educational purposes.
            </p>

            <h2>7. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy,
              which also governs your use of the Service, to understand our
              practices.
            </p>

            <h2>8. Disclaimers</h2>
            <p>
              The information on this platform is provided on an &quot;as
              is&quot; basis. We disclaim all warranties, express or implied,
              including but not limited to warranties of merchantability,
              fitness for a particular purpose, and non-infringement.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              In no event shall The Pitch Deck be liable for any indirect,
              incidental, special, consequential, or punitive damages, including
              without limitation, loss of profits, data, use, goodwill, or other
              intangible losses.
            </p>

            <h2>10. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the
              Service immediately, without prior notice or liability, under our
              sole discretion, for any reason whatsoever, including without
              limitation if you breach the Terms.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time.
              If a revision is material, we will provide at least 30 days notice
              prior to any new terms taking effect.
            </p>

            <h2>12. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <ul>
              <li>Email: legal@thepitchdeck.com</li>
              <li>Address: 123 Business Ave, Suite 100, New York, NY 10001</li>
            </ul>

            <h2>13. Governing Law</h2>
            <p>
              These Terms shall be interpreted and governed by the laws of the
              State of New York, without regard to its conflict of law
              provisions.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
