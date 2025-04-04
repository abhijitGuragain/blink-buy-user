import { useForm, SubmitHandler } from 'react-hook-form';
import DefaultLayout from "../components/DefaultLayout";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      console.log('Contact Form Data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Thank you for your message! We will get back to you soon.');
      reset();
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your message. Please try again.');
    }
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-base-200 py-16">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h1 className="text-5xl font-bold text-primary mb-6">Contact Us</h1>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto leading-relaxed">
            We’d love to hear from you! Whether you have a question, feedback, or need support, reach out to the BlinkBuy team anytime.
          </p>
        </section>

        {/* Contact Form and Details */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="card bg-base-100 shadow-xl p-8 rounded-xl">
            <h2 className="text-3xl font-semibold text-secondary mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className={`input input-bordered w-full text-lg py-3 ${errors.name ? 'input-error' : ''}`}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <span className="text-error text-sm mt-2">{errors.name.message}</span>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className={`input input-bordered w-full text-lg py-3 ${errors.email ? 'input-error' : ''}`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-error text-sm mt-2">{errors.email.message}</span>
                )}
              </div>

              {/* Subject */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Subject</span>
                </label>
                <input
                  type="text"
                  placeholder="Subject"
                  className={`input input-bordered w-full text-lg py-3 ${errors.subject ? 'input-error' : ''}`}
                  {...register('subject', { required: 'Subject is required' })}
                />
                {errors.subject && (
                  <span className="text-error text-sm mt-2">{errors.subject.message}</span>
                )}
              </div>

              {/* Message */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Message</span>
                </label>
                <textarea
                  placeholder="Your Message"
                  className={`textarea textarea-bordered w-full h-40 text-lg py-3 ${errors.message ? 'textarea-error' : ''}`}
                  {...register('message', { required: 'Message is required' })}
                />
                {errors.message && (
                  <span className="text-error text-sm mt-2">{errors.message.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full text-lg py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="card bg-base-100 shadow-xl p-8 rounded-xl">
            <h2 className="text-3xl font-semibold text-accent mb-8">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <svg className="w-8 h-8 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="font-medium text-lg">Email</h3>
                  <p className="text-base-content/70 text-lg">support@blinkbuy.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <svg className="w-8 h-8 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h3 className="font-medium text-lg">Phone</h3>
                  <p className="text-base-content/70 text-lg">+1 (800) 555-0123</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <svg className="w-8 h-8 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h3 className="font-medium text-lg">Address</h3>
                  <p className="text-base-content/70 text-lg">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default Contact;