import Layout from "../layout/layout";


const Dashboard = () => {
  return (
    <Layout>
      <div className="  flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-green-600 mb-4">
          Welcome to the Dashboard!
        </h2>
        <p className="text-lg text-gray-700">
          This is your main dashboard where you can view tasks, track progress,
          and more.
        </p>
        <div className="mt-8 p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Dashboard Stats
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center bg-sky-100 p-4 rounded shadow">
              <h4 className="text-xl font-semibold text-gray-700">
                Total Tasks
              </h4>
              <p className="text-2xl text-blue-600">42</p>
            </div>
            <div className="flex flex-col items-center bg-sky-100 p-4 rounded shadow">
              <h4 className="text-xl font-semibold text-gray-700">
                In Progress
              </h4>
              <p className="text-2xl text-yellow-600">5</p>
            </div>
            <div className="flex flex-col items-center bg-sky-100 p-4 rounded shadow">
              <h4 className="text-xl font-semibold text-gray-700">Completed</h4>
              <p className="text-2xl text-green-600">37</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
