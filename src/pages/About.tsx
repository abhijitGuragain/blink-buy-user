import DefaultLayout from "../components/DefaultLayout";

const About = () => {
  // Mock data for the About page
  const teamMembers = [
    { name: "John Doe", role: "Founder & CEO", image: "https://i.pinimg.com/736x/ea/50/80/ea508059e1a6d2f2439c7fac89590526.jpg" },
    { name: "Jane Smith", role: "Chief Marketing Officer", image: "https://i.pinimg.com/736x/ea/50/80/ea508059e1a6d2f2439c7fac89590526.jpg" },
    { name: "Mike Johnson", role: "Lead Developer", image: "https://i.pinimg.com/736x/ea/50/80/ea508059e1a6d2f2439c7fac89590526.jpg" },
  ];

  const milestones = [
    { year: "2020", event: "BlinkBuy Founded" },
    { year: "2021", event: "Reached 10,000 Users" },
    { year: "2023", event: "Expanded to 5 Cities" },
    { year: "2024", event: "Hit $1M in Sales" },
  ];

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-base-200 py-10 px-5">
        {/* Hero Section */}
        <section className="bg-base-100 shadow-lg mx-auto max-w-7xl p-8 rounded-lg mb-12">
          <div className="hero">
            <div className="hero-content flex-col lg:flex-row gap-8">
              <img
                src="https://i.pinimg.com/736x/3b/09/b6/3b09b6cf5b2f46372baaf00dcc2a81d7.jpg"
                alt="BlinkBuy Marketplace"
                className="max-w-sm rounded-lg shadow-2xl"
              />
              <div>
                <h1 className="text-4xl font-bold text-primary mb-4">About BlinkBuy</h1>
                <p className="text-lg text-base-content/80 leading-relaxed">
                  BlinkBuy is your one-stop e-commerce platform, connecting buyers and sellers worldwide. Founded with a vision to simplify online shopping, we strive to provide a seamless, secure, and enjoyable experience for everyone. Our mission is to empower small businesses and deliver exceptional value to customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-7xl mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-secondary mb-4">Our Mission</h2>
              <p className="text-base-content/70">
                To create a thriving marketplace where sellers can grow their businesses and buyers can find quality products at competitive prices, all while fostering trust and community.
              </p>
            </div>
            <div className="card bg-base-100 shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-secondary mb-4">Our Vision</h2>
              <p className="text-base-content/70">
                To be the leading global e-commerce platform, recognized for innovation, sustainability, and customer satisfaction, transforming the way people shop online.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="max-w-7xl mx-auto px-4 mb-12">
          <h2 className="text-3xl font-bold text-center text-base-content mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <figure className="px-6 pt-6">
                  <img src={member.image} alt={member.name} className="rounded-full w-32 h-32 object-cover" />
                </figure>
                <div className="card-body items-center text-center">
                  <h3 className="card-title text-lg font-semibold">{member.name}</h3>
                  <p className="text-base-content/70">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones Timeline */}
        <section className="max-w-7xl mx-auto px-4 mb-12">
          <h2 className="text-3xl font-bold text-center text-base-content mb-8">Our Journey</h2>
          <div className="timeline timeline-vertical">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-box">
                <div className="timeline-start">{milestone.year}</div>
                <div className="timeline-middle">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                </div>
                <div className="timeline-end timeline-box bg-base-100 shadow-lg p-4">
                  <p className="font-medium">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-7xl mx-auto px-4 mb-12">
          <div className="card bg-primary text-primary-content shadow-lg">
            <div className="card-body text-center">
              <h2 className="text-2xl font-bold mb-4">Join the BlinkBuy Community</h2>
              <p className="mb-6">
                Whether you're a buyer looking for great deals or a seller ready to grow your business, BlinkBuy is here for you!
              </p>
              <div className="flex justify-center gap-4">
                <button className="btn btn-secondary">Shop Now</button>
                <button className="btn btn-accent">Become a Seller</button>
              </div>
            </div>
          </div>
        </section>

        {/* Fun Facts */}
        <section className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-base-content mb-8">Fun Facts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="stat bg-base-100 shadow-lg p-6 rounded-lg">
              <div className="stat-value text-success">50K+</div>
              <div className="stat-title">Happy Customers</div>
            </div>
            <div className="stat bg-base-100 shadow-lg p-6 rounded-lg">
              <div className="stat-value text-success">1M+</div>
              <div className="stat-title">Products Sold</div>
            </div>
            <div className="stat bg-base-100 shadow-lg p-6 rounded-lg">
              <div className="stat-value text-success">24/7</div>
              <div className="stat-title">Support Available</div>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default About;