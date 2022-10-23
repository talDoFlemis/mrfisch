import DashboardLayout from "@components/layout/DashboardLayout";
import AddLinkModal from "@components/portulovers/AddLinkModal";
import DeleteLinkModal from "@components/portulovers/DeleteLinkModal";
import EditLinkModal from "@components/portulovers/EditLinkModal";
import UsefulLinkCard from "@components/portulovers/UsefulLinkCard";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ReactElement, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilePlus } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";
import { toast } from "react-toastify";
import { UsefulLinkInterface, UsefulLinkModalData } from "typings";
import Head from "next/head";
import {
  getUser,
  supabaseClient,
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";

const Portulovers = ({
  links,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [modalData, setModalData] = useState<UsefulLinkModalData>();
  const [linksData, setLinksData] = useState<UsefulLinkInterface[]>(links);
  const [search, setSearch] = useState<string>("");
  const { user } = useUser();

  const getLinks = async () => {
    try {
      const { data, error } = await supabaseClient
        .from<UsefulLinkInterface>("useful_links")
        .select("*");
      console.log(data);
      if (error) throw error;
      setLinksData(data);
    } catch (err) {
      const error = err as Error;
      toast.error(`Unable to fetch the links, ${error.message}`);
    }
  };

  const deleteLink = async () => {
    try {
      const { error } = await supabaseClient
        .from("useful_links")
        .delete()
        .match({ id: modalData?.id });
      if (error) throw error;
      toast.success(`Link ${modalData?.title} was deleted with success`);
      getLinks();
    } catch (err) {
      const error = err as Error;
      toast.error(`Unable to delete the link, ${error.message}`);
    }
  };

  useEffect(() => {
    if (user) getLinks();
  }, [user]);

  return (
    <main className="flex flex-col gap-4 p-4 w-full h-max">
      <Head>
        <title>Portulovers • Mr Fisch</title>
      </Head>
      <header className="flex sticky top-0 z-10 justify-between items-center p-4 bg-opacity-40 navbar backdrop-blur-sm">
        <h1 className="text-3xl sm:text-4xl">Useful Links</h1>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <AiOutlineSearch className="w-4 h-4" />
            </div>
            <input
              type="search"
              placeholder="Search a link"
              onChange={(e) => setSearch(e.target.value)}
              className="block p-4 pl-10 w-full rounded-lg input input-bordered input-primary bg-neutral text-neutral-content"
            />
          </div>
          <label htmlFor="addmodal">
            <BsFilePlus className="w-4 h-4 cursor-pointer sm:w-6 sm:h-6 hover:text-accent" />
          </label>
          <label
            className="transition-colors cursor-pointer lg:hidden text-base-content hover:text-accent"
            htmlFor="drawer"
          >
            <HiOutlineMenu className="w-6 h-6" />
          </label>
        </div>
      </header>
      {modalData && (
        <>
          <EditLinkModal
            id={modalData.id}
            title={modalData.title}
            link={modalData.link}
            user_id={user?.id as string}
            getLinks={getLinks}
          />
          <DeleteLinkModal title={modalData.title} deleteOP={deleteLink} />
        </>
      )}
      {user && <AddLinkModal user_id={user.id} getLinks={getLinks} />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {linksData
          ?.filter((link) => {
            if (search === "") {
              return link;
            } else if (
              link.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return link;
            }
          })
          .map((data) => (
            <UsefulLinkCard
              id={data.id}
              key={data.title}
              title={data.title}
              link={data.link}
              setShowEditModal={setModalData}
              inserted_at={data.inserted_at}
              updated_at={data.updated_at}
              user_id={data.user_id}
            />
          ))}
      </div>
    </main>
  );
};

Portulovers.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Portulovers;

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/stop",
  async getServerSideProps(ctx) {
    const { data: isPort, error } = await supabaseServerClient(ctx).rpc(
      "get_is_portulover"
    );

    if (error) console.log(error);
    if (!isPort) {
      return {
        props: {},
        redirect: { destination: "/stop", permanent: false },
      };
    }

    const { user } = await getUser(ctx);
    const { data: links, error: linkError } = await supabaseServerClient(ctx)
      .from("useful_links")
      .select("*, user_id(username, avatar_url)")
      .order("updated_at", { ascending: false });
    if (error) console.log(linkError);

    return { props: { user, links } };
  },
});
