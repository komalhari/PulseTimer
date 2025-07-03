

export default function DeleteInfoPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">How to Delete Your PulseTimer Account</h1>
      <p className="mb-6">
        You can permanently delete your PulseTimer account and all associated data directly from within the app.
      </p>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Steps to Delete Your Account</h2>
      <ol className="list-decimal ml-5 space-y-2">
  <li>Log into your PulseTimer account.</li>
  <li>Go to <strong>Account &gt; Advanced</strong>.</li>
  <li>Under <strong>&quot;Delete Your Account&quot;, </strong>click <strong>Delete</strong>.</li>
  <li>Type <strong>&quot;CONFIRM&quot;</strong>, and finally click <strong>I understand.</strong> </li>
</ol>
        </div>

        <div>
          <h2 className="text-xl font-semibold">What Gets Deleted?</h2>
          <p>
            All your personal data, workout history, and authentication records will be permanently removed from our system. This action is irreversible.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Need Help?</h2>
          <p>
            If you encounter issues deleting your account, please contact us at{" "}
            <a href="mailto:pulsetimer@app.com" className="text-blue-600 underline">pulsetimer@app.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
