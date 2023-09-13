import AuthForm from './components/AuthForm';

const SignUp = () => {
  return (
    <div
      className="
        flex 
        min-h-[86vh] 
        flex-col 
        justify-center 
        py-12 
        pt-0
        sm:px-6 
        lg:px-8 
        bg-gray-100
      "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          className="
             
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900
          "
        >
          Sign Up Form
        </h2>
      </div>
      <AuthForm />
    </div>
  );
};

export default SignUp;
