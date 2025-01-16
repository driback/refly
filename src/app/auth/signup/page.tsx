import Link from "next/link";
import { PageWrapper } from "~/components/app-wrapper";
import AuthFormWrapper from "~/features/auth/auth-form-wrapper";
import SignUpForm from "~/features/auth/signup-form";
import { AppLinks } from "~/lib/constants";

const SighUpPage = () => {
  return (
    <PageWrapper>
      <div className="flex h-[100dvh] w-full items-center justify-center overflow-hidden">
        <AuthFormWrapper>
          <h2 className="font-bold text-2xl">Create Account</h2>
          <p className="text-sm">
            Already have an account?{" "}
            <Link href={AppLinks.SignIn} className="hover:underline">
              Login
            </Link>
          </p>
          <SignUpForm />
        </AuthFormWrapper>
      </div>
    </PageWrapper>
  );
};

export default SighUpPage;
