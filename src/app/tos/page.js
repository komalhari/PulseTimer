// app/terms/page.js

export default function TermsOfServicePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">PulseTimer Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-10">Effective Date: July 3, 2025</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">1. Use of the App</h2>
          <p>
            PulseTimer is a fitness and workout planning tool that helps users organize and time their workouts. You agree to use the app for lawful purposes only.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">2. User Accounts</h2>
          <p>
            You may be required to sign in using third-party providers like Google, Facebook, or Spotify. You are responsible for maintaining the confidentiality of your login credentials.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">3. User Data</h2>
          <p>
            We collect basic personal information (e.g., name, email) solely for the purpose of account creation and personalization. For more details, see our{" "}
            <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
          <p>
            All content, branding, and code within PulseTimer is the intellectual property of its creators and may not be copied or reused without permission.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">5. Disclaimer</h2>
          <p>
            PulseTimer is provided “as is.” We do not guarantee that it will be error-free or always available. Use the service at your own risk.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">6. Modifications</h2>
          <p>
            We may update these Terms from time to time. Continued use of the app after changes implies acceptance of the updated terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">7. Contact Us</h2>
          <p>
            If you have any questions about these Terms, you can contact us at:{" "}
            <a href="mailto:pulsetimer@app.com" className="text-blue-600 underline">pulsetimer@app.com</a>
          </p>
        </div>
      </section>
    </main>
  );
}
