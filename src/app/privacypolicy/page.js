// app/privacy/page.js

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">PulseTimer Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Effective Date: July 3, 2025</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <p>
            PulseTimer respects your privacy. This policy explains what information we collect, how we use it, and your rights regarding your data.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">2. Information We Collect</h2>
          <p>
            We collect basic personal information, such as your name, email address, and profile picture, when you sign in using third-party OAuth providers like Google, Facebook, or Spotify.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">3. How We Use Your Information</h2>
          <p>
            The information we collect is used solely to create and personalize your PulseTimer account. We do not sell or share your personal data with third parties.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">4. Data Storage and Security</h2>
          <p>
            All data is securely stored and managed using Supabase. We take reasonable steps to protect your data from unauthorized access, loss, or misuse.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">5. Third-Party Services</h2>
          <p>
            We integrate with third-party services such as Supabase, Spotify, Google, and Facebook for authentication. These services may collect data in accordance with their own privacy policies.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">6. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. You can contact us at any time to make such requests.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with a new effective date.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:pulsetimer@app.com" className="text-blue-600 underline">pulsetimer.app@gmail.com</a>
          </p>
        </div>
      </section>
    </main>
  );
}
