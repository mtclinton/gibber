import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import className from "classnames";
import { UserIcon } from '@heroicons/react/24/solid'
import {
    ArrowPathRoundedSquareIcon,
    ChatBubbleLeftIcon,
    HeartIcon,
} from "@heroicons/react/24/outline";

import { api } from "../utils/api";

const Home: NextPage = () => {
    const account = api.account.getByUsername.useQuery({ username: "maxprograms" });
    const post = api.post.getByAccountId.useQuery(
        {
            accountId: account.data?.id as string,
        },
        {
            enabled: account.isSuccess,
        }
    );

    return (
        <>
            <Head>
                <title>Max&apos;s Profile</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {account.isLoading && (
                <div className="h-screen flex items-center justify-center">
                    <svg
                            className="-ml-1 mr-3 h-8 w-8 animate-spin text-red-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                </div>
            )}
            {account.data &&(
                <div className="max-w-[615px]">
                        <div className="aspect-w-3 aspect-h-1 bg-neutral-50">
                            {account.data.header && (
                                <Image
                                    src={account.data.header}
                                    alt="account's header"
                                    width={615}
                                    height={205}
                                />
                            )}
                        </div>
                        <div className="px-6 pt-2">
                            <div className="flex">
                                <div className="relative shrink-0 basis-[100px]">
                                    <div className={className("absolute box-content overflow-hidden top-[-50px] h-[100px] w-[100px] border-2 border-white rounded-full bg-neutral-100",
                                    {"border-opacity-25 bg-clip-padding": account.data.avatar})}>
                                        {account.data.avatar && (
                                            <Image
                                                alt="account's avatar"
                                                src={account.data.avatar}
                                                width={100}
                                                height={100}
                                            />
                                        )}
                                        {!account.data.avatar && (
                                            <UserIcon className="m-[25%] w-1/2 text-neutral-400" />
                                        )}
                                    </div>
                                </div>
                                <div className="ml-3.5 min-w-0">
                                    <p className="text-lg">{account.data.name}</p>
                                    <p className="overflow-hidden text-ellipsis">{account.data.address}</p>
                                </div>
                            </div>
                            <div className="mt-7">{account.data.summary}</div>
                            <div className="flex mt-3.5">
                                <p>
                                    <span className="font-semibold">{account.data.followersCount}</span>
                                    &nbsp;Followers
                                </p>
                                <p>
                                    <span className="font-semibold ml-5">{account.data.followingCount}</span>
                                    &nbsp;Following
                                </p>
                            </div>
                        </div>
                        <div className="flex h-10 mt-3.5 space-x-3.5 overflow-auto border-b-2 border-neutral-50">
                            <div className="flex items-center h-full bg-red-50 px-6 rounded-t-lg shrink-0 ml-3.5">
                                <p className="font-semibold text-red-600">Posts</p>
                            </div>
                            <div className="flex items-center h-full px-6 rounded-t-lg shrink-0">
                                <p className="font-semibold text-neutral-600">Posts & replies</p>
                            </div>
                            <div className="flex items-center h-full  px-6 rounded-t-lg shrink-0">
                                <p className="font-semibold text-neutral-600">Media</p>
                            </div>
                        </div>
                        {post.data && (
                            <div className="border-b-2 border-neutral-50 px-6 py-5">
                                <div className="flex">
                                    <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                                        <Image
                                            alt="Person's avatar"
                                            src={post.data.account.avatar}
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div className="ml-3.5 flex flex-col justify-center">
                                        <p>{post.data.account.name}</p>
                                        <p className="text-sm">
                                            {post.data.createdAt.toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                {post.data.attachments && (
                                    <div className="mt-3.5 grid h-[250px] grid-cols-2 grid-rows-2 gap-2">
                                        {post.data.attachments.map(
                                            (attachment, i) => (
                                                <div
                                                    className={className(
                                                        "overflow-hidden rounded-lg shadow",
                                                        {
                                                            "row-span-2": i == 0,
                                                        }
                                                    )}
                                                    key={attachment.id}
                                                >
                                                    <Image
                                                        className="h-full object-cover"
                                                        alt={attachment.description}
                                                        src={attachment.url}
                                                        width={attachment.width}
                                                        height={attachment.height}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                                {post.data.content && (
                                    <div className="mt-3.5">
                                        <p>{post.data.content}</p>
                                    </div>
                                )}
                                <div className="mt-3.5 flex justify-between">
                                    <div className="flex items-center">
                                        <ChatBubbleLeftIcon
                                            className="mr-3"
                                            width={20}
                                            height={20}
                                        />
                                        <p>{post.data.repliesCount}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <ArrowPathRoundedSquareIcon
                                            className="mr-3"
                                            width={20}
                                            height={20}
                                        />
                                        <p>{post.data.reblogsCount}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <HeartIcon
                                            className="mr-3"
                                            width={20}
                                            height={20}
                                        />
                                        <p>{post.data.favoritesCount}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
            )}

        </>
    );
};

export default Home;

