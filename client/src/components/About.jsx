import pic1 from "../assets/pic1.jpg";
import pic2 from "../assets/pic2.jpg";
import ceo from "../assets/ceo.jpg";
import frontendTeam from "../assets/team.jpg";
import backendTeam from "../assets/backendteam.jpg";

const About = () => {
  return (
    <section className="bg-zinc-200 dark:bg-night-200 flex-grow pt-20 pb-8">
      <div className=" px-4 py-6 min-h-screen">
        {/* Top Section */}
        <div className="mb-12 bg-gray-200 py-8 px-4 rounded-md">
          <h2 className="text-3xl font-bold text-[#2C3E50] dark:text-orange-300 text-left mb-5 sm:m-0">
            Discover Deox Foods
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <p className="text-gray-700 text-left max-w-3xl md:w-2/3">
              Welcome to the ultimate food delivery experience tailored just for
              you! At Deox Foods, we believe that good food should be
              accessible, convenient, and personalized. Whether you&apos;re a
              student juggling deadlines or someone seeking a delicious meal on
              the go, we bring your favorite dishes to your doorstep in no time.
              Explore a world of flavors, curated for your taste and lifestyle.
            </p>
            <img
              src={pic2}
              alt="Deox Foods Delivery Experience"
              className="w-full sm:w-64 h-48 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-[#2C3E50] dark:text-orange-300  mb-6 text-center ">
          Why Choose Us?
        </h2>

        {/* Why Choose Us Section */}
        <div className="mb-12 bg-gray-200 py-8 px-4 rounded-md">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <img
              src={pic1}
              alt="Deox Foods Highlights"
              className="w-full sm:w-64 h-48 object-cover rounded-lg shadow-lg"
            />
            <p className="text-gray-700 text-left max-w-3xl md:w-2/3">
              We&apos;re not just another food delivery platform—we&apos;re your
              partner in wellness and convenience. Powered by AI, Deox Foods
              recommends meals that suit your diet, lifestyle, and health goals.
              With real-time nutritional insights, calorie tracking, and fast
              delivery, we ensure every bite is worth savoring. Join the Deox
              Foods family and let us redefine how you experience food.
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-[#2C3E50] dark:text-orange-300 text-center mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-600 dark:text-gray-200 text-center mb-6">
            The amazing team behind Deox Foods
          </p>
        </div>

        {/* Team Images Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 bg-gray-200 py-8 px-3 rounded-md">
          <div className="w-full sm:w-64">
            <img
              src={ceo}
              alt="Deon Orina"
              className="w-full h-56 object-cover rounded-lg shadow-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-[#2C3E50] ">
                Deon Orina
              </h3>
              <p className="text-gray-600 ">Founder & CEO</p>
            </div>
          </div>
          <div className="w-full sm:w-64">
            <img
              src={frontendTeam}
              alt="Happy Customers"
              className="w-full h-56 object-cover rounded-lg shadow-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-[#2C3E50]">
                Frontend Team
              </h3>
              <p className="text-gray-600">Building the Future</p>
            </div>
          </div>
          <div className="w-full sm:w-64">
            <img
              src={backendTeam}
              alt="Deox Foods Delivery"
              className="w-full h-56 object-cover rounded-lg shadow-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-[#2C3E50]">
                Backend Team
              </h3>
              <p className="text-gray-600 ">Building the Future</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
