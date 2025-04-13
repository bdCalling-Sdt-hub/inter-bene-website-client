"use client";
import authImage from "@/asset/auth/auth.jpg";
import logo from "@/asset/logo/logo.png";
import CustomForm from "@/components/custom/custom-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordValidationSchema } from "@/validation/auth.validation";
import { FieldValues } from "react-hook-form";
import CustomInput from "@/components/custom/custom-input";
import CustomButton from "@/components/custom/custom-button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
const ResetPassword = () => {
  const router = useRouter();
  const handleResetPassword = async (values: FieldValues) => {
    const { email } = values;
    router.push(`/verify-email?email=${email}`);
  };
  return (
    <section className="w-full h-screen flex items-center justify-center relative p-5">
      {/* Background with blur effect */}
      <div
        style={{
          backgroundImage: `url(${authImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(8px)", // Apply blur effect to background image
        }}
        className="absolute top-0 left-0 w-full h-full"
      ></div>
      {/* Semi-transparent color overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#40E0D054]"></div>
      {/* Content that remains sharp */}
      <div className="w-full max-w-[500px] mx-auto px-8 md:px-[65px] py-12 md:py-[56px] bg-[#FFFFFF] z-30 rounded-lg border-2 border-[#40E0D0] shadow-xl shadow-gray-900">
        <div className="flex justify-between">
          <h1 className="text-xl lg:text-3xl xl:text-4xl font-semibold">
            Reset Password
          </h1>
          <Image
            src={logo}
            alt="logo"
            width={128}
            height={128}
            className="ml-2 w-[90px] md:w-[128px] md:h-[115px]"
          />
        </div>
        {/* Form content */}
        <CustomForm
          onSubmit={handleResetPassword}
          resolver={zodResolver(resetPasswordValidationSchema)}
        >
          <div className="space-y-3 md:space-y-6 mt-8">
            <CustomInput
              name="newPassword"
              label="New Password"
              fullWidth
              size="lg"
              icon={<Lock size={24} className="text-[#F95F19]"/>}
              placeholder="Enter new password"
              varient="outline"
              type="password"
            />
            <CustomInput
              name="confirmPassword"
              label="Confirm Password"
              fullWidth
              size="lg"
              icon={<Lock size={24} className="text-[#F95F19]"/>}
              placeholder="Enter confirm password"
              varient="outline"
              type="password"
            />
            <CustomButton fullWidth className="py-4">
              Send OTP
            </CustomButton>
            <div className="flex gap-1 items-center justify-center">
              <span className="text-sm md:text-[16px] font-medium">
                Back To
              </span>
              <Link
                href="/login"
                className="text-sm md:text-[16px] font-medium text-[#40E0D0] hover:underline"
              >
                Login
              </Link>
            </div>
          </div>
        </CustomForm>
      </div>
    </section>
  );
};

export default ResetPassword;
