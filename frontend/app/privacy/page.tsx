import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Last updated: January 1, 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2>1. Information We Collect</h2>

            <h3>Personal Information</h3>
            <p>
              We collect information you provide directly to us, such as when
              you:
            </p>
            <ul>
              <li>Create an account</li>
              <li>Apply to competitions</li>
              <li>Contact us for support</li>
              <li>Subscribe to our newsletter</li>
            </ul>
            <p>
              This may include your name, email address, school information,
              grade level, and other details necessary for competition
              participation.
            </p>

            <h3>Usage Information</h3>
            <p>
              We automatically collect certain information about your use of our
              Service, including:
            </p>
            <ul>
              <li>Log data (IP address, browser type, pages visited)</li>
              <li>Device information</li>
              <li>Usage patterns and preferences</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our Service</li>
              <li>Process competition applications and manage events</li>
              <li>Communicate with you about competitions and updates</li>
              <li>
                Send newsletters and promotional materials (with your consent)
              </li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Comply with legal obligations</li>
              <li>Protect against fraud and abuse</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>We may share your information in the following circumstances:</p>

            <h3>With Competition Organizers</h3>
            <p>
              When you apply to competitions, we share necessary information
              with organizers to process your application and facilitate
              participation.
            </p>

            <h3>With Service Providers</h3>
            <p>
              We work with third-party service providers who help us operate our
              platform, such as hosting services, email providers, and analytics
              tools.
            </p>

            <h3>For Legal Reasons</h3>
            <p>
              We may disclose information if required by law or to protect our
              rights and safety.
            </p>

            <h3>With Your Consent</h3>
            <p>
              We may share information for other purposes with your explicit
              consent.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the internet is 100% secure.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to
              provide our services and fulfill the purposes outlined in this
              policy. We may retain certain information for longer periods as
              required by law or for legitimate business purposes.
            </p>

            <h2>6. Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data</li>
              <li>Object to certain processing activities</li>
            </ul>

            <h2>7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your
              experience, analyze usage, and provide personalized content. You
              can control cookie settings through your browser preferences.
            </p>

            <h2>8. Third-Party Links</h2>
            <p>
              Our Service may contain links to third-party websites. We are not
              responsible for the privacy practices of these external sites and
              encourage you to review their privacy policies.
            </p>

            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Our Service is designed for high school students (ages 13-18). We
              comply with applicable laws regarding the collection of
              information from minors. If you are under 18, please ensure you
              have parental consent before using our Service.
            </p>

            <h2>10. International Users</h2>
            <p>
              If you are accessing our Service from outside the United States,
              please be aware that your information may be transferred to,
              stored, and processed in the United States where our servers are
              located.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the new policy on
              this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data
              practices, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@thepitchdeck.com</li>
              <li>Address: 123 Business Ave, Suite 100, New York, NY 10001</li>
              <li>Phone: (555) 123-4567</li>
            </ul>

            <h2>13. California Privacy Rights</h2>
            <p>
              If you are a California resident, you have additional rights under
              the California Consumer Privacy Act (CCPA), including the right to
              know what personal information we collect, the right to delete
              personal information, and the right to opt-out of the sale of
              personal information.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
