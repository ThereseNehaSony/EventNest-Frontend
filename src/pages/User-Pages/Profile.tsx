import React from 'react';
import Sidebar from '../../components/sidebar/userSidebar';

export default function ProfilePage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <section className="bg-gray-100 py-10 flex-grow">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            {/* Any additional content above the profile can go here */}
          </div>

          <div className="flex flex-wrap -mx-4">
            {/* Left Column */}
            <div className="w-full lg:w-1/3 px-4 mb-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="text-center p-6">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-full w-36 mx-auto mb-4"
                  />
                  <h5 className="text-xl font-medium mb-1">Johnatan Smith</h5>
                  {/* <p className="text-gray-600 mb-1">Full Stack Developer</p>
                  <p className="text-gray-500 mb-4">Bay Area, San Francisco, CA</p>
                  <div className="flex justify-center space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Follow</button>
                    <button className="bg-transparent border-2 border-blue-500 text-blue-500 px-4 py-2 rounded">
                      Message
                    </button> */}
                  {/* </div> */}
                </div>
                {/* <ul className="divide-y divide-gray-200">
                  <li className="flex justify-between items-center p-3">
                    <span className="text-yellow-500"><i className="fas fa-globe"></i></span>
                    <a href="https://mdbootstrap.com" className="text-blue-500 hover:underline">https://mdbootstrap.com</a>
                  </li>
                  <li className="flex justify-between items-center p-3">
                    <span className="text-gray-800"><i className="fab fa-github"></i></span>
                    <span>mdbootstrap</span>
                  </li>
                  <li className="flex justify-between items-center p-3">
                    <span className="text-blue-400"><i className="fab fa-twitter"></i></span>
                    <span>@mdbootstrap</span>
                  </li>
                  <li className="flex justify-between items-center p-3">
                    <span className="text-pink-600"><i className="fab fa-instagram"></i></span>
                    <span>mdbootstrap</span>
                  </li>
                  <li className="flex justify-between items-center p-3">
                    <span className="text-blue-800"><i className="fab fa-facebook"></i></span>
                    <span>mdbootstrap</span>
                  </li>
                </ul> */}
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-2/3 px-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
                <div className="p-6">
                  <div className="mb-4">
                    <h6 className="text-gray-600 font-medium">Full Name</h6>
                    <p className="text-gray-700">Johnatan Smith</p>
                  </div>
                  <div className="mb-4">
                    <h6 className="text-gray-600 font-medium">Email</h6>
                    <p className="text-gray-700">example@example.com</p>
                  </div>
                  <div className="mb-4">
                    <h6 className="text-gray-600 font-medium">Phone</h6>
                    <p className="text-gray-700">(097) 234-5678</p>
                  </div>
                  {/* <div className="mb-4">
                    <h6 className="text-gray-600 font-medium">Mobile</h6>
                    <p className="text-gray-700">(098) 765-4321</p>
                  </div> */}
                  <div className="mb-4">
                    <h6 className="text-gray-600 font-medium">Address</h6>
                    <p className="text-gray-700">Bay Area, San Francisco, CA</p>
                  </div>
                </div>
              </div>

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h6 className="text-gray-600 font-medium mb-4">Project Status</h6>
                    <p className="text-sm font-medium text-gray-600 mb-2">Web Design</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Website Markup</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-2">One Page</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Mobile Template</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Backend API</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '66%' }}></div>
                    </div>
                  </div>
                </div> */}

                {/* <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h6 className="text-gray-600 font-medium mb-4">Project Status</h6>
                    <p className="text-sm font-medium text-gray-600 mb-2">Web Design</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Website Markup</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-2">One Page</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Mobile Template</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Backend API</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '66%' }}></div>
                    </div>
                  </div>
                </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
