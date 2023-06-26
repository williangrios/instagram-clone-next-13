"use client";
import Header from "@/components/Header";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Auth() {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)
  useEffect(() => {
    async function getProv(){
      const resProviders = await getProviders();
      setProviders(resProviders)
    }
    getProv();
    
  }, [])

  return (
    <div>
      <Header />
      <div className="flex max-w-4xl m-auto pt-32">
        <div className="hidden md:inline-flex md:w-1/2  justify-end">
          <img
            width="350px"
            height="450px"
            src="https://mlabs-wordpress-site.s3.amazonaws.com/wp-content/uploads/2022/08/gerenciador-instagram.png"
            alt="instagram"
            className="rotate-6"
          />
        </div>
        <div className="flex flex-col items-center w-full md:w-1/2 justify-center">
          {providers &&
            Object.values(providers).map((provider, i) => (
              <div
                key={i}
                className="flex flex-col justify-center items-center"
              >
                <img
                  width="150px"
                  src="https://melomoreiraadvogados.com.br/wp-content/uploads/2020/03/Como-copiar-o-link-de-um-perfil-ou-postagem-do-Instagram-Instagram-Melo-Moreira-Advogados-Especialistas-em-Direito-Digital-e-Internet-870x843.png"
                  alt="instagram"
                />
                <p className="text-sm  italic mt-10">
                  This app was created by Willian
                </p>
                <button
                  className="bg-red-400 cursor-pointer px-3 py-4 text-white font-bold rounded-lg mt-10 hover:brightness-110"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
