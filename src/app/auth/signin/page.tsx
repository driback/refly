import Link from "next/link";
import { PageWrapper } from "~/components/app-wrapper";
import AuthFormWrapper from "~/features/auth/auth-form-wrapper";
import SingInForm from "~/features/auth/signin-form";
import { AppLinks } from "~/lib/constants";

const SignInPage = () => {
  return (
    <PageWrapper>
      <div className="flex h-[100dvh] w-full items-center justify-center overflow-hidden">
        <AuthFormWrapper>
          <h2 className="font-bold text-2xl">Sign In</h2>
          <p className="text-sm">
            Doesnt have an account?{" "}
            <Link href={AppLinks.SignUp} className="hover:underline">
              Sign Up
            </Link>
          </p>
          <SingInForm />
        </AuthFormWrapper>
      </div>
    </PageWrapper>
  );
};

export default SignInPage;
