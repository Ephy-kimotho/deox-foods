const Contact = () => {
  return (
    <div className="min-h-screen bg-zinc-200 dark:bg-night-200 flex flex-col items-center py-10 flex-grow">
      <h1 className="text-4xl font-bold text-gray-700 dark:text-orange-600 mt-16 mb-6">
        Contact Deox Foods
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 text-center max-w-2xl mb-10">
        Have any questions or feedback? We&apos;d love to hear from you! Reach
        out to us using the form below or via our contact details.
      </p>

      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 py-2 pl-3 w-full rounded-md  border border-gray-800 focus:outline-2 focus:border-none focus:outline-orange-200 placeholder:text-gray-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 py-2 pl-3 w-full rounded-md  border border-gray-800 focus:outline-2 focus:border-none focus:outline-orange-200 placeholder:text-gray-500"
              placeholder="youremail@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="mt-1 py-2 pl-3 w-full rounded-md  border border-gray-800 focus:outline-2 focus:border-none focus:outline-orange-200 placeholder:text-gray-500"
              required
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="mt-10 text-center">
        <p className="text-xl text-gray-700 dark:text-gray-200">
          Or reach out to us directly:
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-200 mt-3">
          Phone: +123 456 789
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-200 my-2">
          Email: support@deoxfoods.com
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-200">
          Address: 123 Food Street, Gourmet City
        </p>
        <p className="mt-4">
          <a
            href="https://wa.me/123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline text-sm"
          >
            Chat with us on WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
