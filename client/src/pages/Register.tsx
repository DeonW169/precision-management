const Register = () => (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input type="text" placeholder="Name" className="input input-bordered w-full mb-3" />
        <input type="email" placeholder="Email" className="input input-bordered w-full mb-3" />
        <input type="password" placeholder="Password" className="input input-bordered w-full mb-3" />
        <button className="btn btn-primary w-full">Register</button>
      </div>
    </div>
  );
  export default Register;
  