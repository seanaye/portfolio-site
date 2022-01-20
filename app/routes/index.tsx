import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { Loaded, sdk } from "~/gqlRequest.server";
import { gql } from "graphql-request";
import { GameOfLifeCanvas } from "~/components/GameOfLifeCanvas";

const _query = gql`
  query GetBio {
    bio {
      data {
        attributes {
          avatar {
            data {
              attributes {
                formats
              }
            }
          }
          bio_text
          twitter
          github
          linkedin
        }
      }
    }
  }
`;

export const loader: LoaderFunction = async () => {
  return await sdk.GetBio();
};

export default function Index() {
  const data = useLoaderData<Loaded<typeof sdk["GetBio"]>>();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <GameOfLifeCanvas/>
      <div className="max-w-3xl mx-auto p-4 bg-zinc-200 shadow-lg shadow-slate-900 rounded-lg">
        <div className="sm:flex">
          <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
            <img
              className="h-32 w-32 border border-gray-300 text-gray-300 object-contain rounded-full mx-auto"
              src={
                data.bio?.data?.attributes?.avatar?.data?.attributes?.formats
                  ?.small?.url
              }
            />
          </div>
          <div>
            <h4 className="text-lg font-bold">About Me</h4>
            <p className="mt-1">{data.bio?.data?.attributes?.bio_text}</p>
            <div className="flex flex-row mt-2 gap-4">
              <a href={data?.bio?.data?.attributes?.github ?? ""} target="_blank">
                <GithubIcon />
              </a>
              <a href={data?.bio?.data?.attributes?.twitter ?? ""} target="_blank">
                <TwitterIcon />
              </a>
              <a href={data?.bio?.data?.attributes?.linkedin ?? ""} target="_blank">
                <LinkedinIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TwitterIcon = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="text-gray-500 hover:text-blue-500 opacity-40 transition-all duration-300"
    >
      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
    </svg>
  );
};

const GithubIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-gray-500 hover:text-blue-500 opacity-40 transition-all duration-300"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
};

const LinkedinIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-gray-500 hover:text-blue-500 opacity-40 transition-all duration-300"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
};
