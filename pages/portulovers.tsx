import DashboardLayout from "@components/layout/DashboardLayout";
import AddLinkModal from "@components/portulovers/AddLinkModal";
import DeleteLinkModal from "@components/portulovers/DeleteLinkModal";
import EditLinkModal from "@components/portulovers/EditLinkModal";
import UsefulLinkCard from "@components/portulovers/UsefulLinkCard";
import { supabase } from "@utils/supabaseClient";
import { GetServerSideProps } from "next";
import { ReactElement, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilePlus } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";
import { toast } from "react-toastify";
import { UsefulLinkInterface, UsefulLinkModalData } from "typings";

const Portulovers = ({ user }: { user: any }) => {
  const [modalData, setModalData] = useState<UsefulLinkModalData>();
  const [linksData, setLinksData] = useState<UsefulLinkInterface[]>();
  const [search, setSearch] = useState<string>("");

  const getLinks = async () => {
    try {
      const { data, error } = await supabase
        .from<UsefulLinkInterface>("useful_links")
        .select("*, user_id(username, avatar_url)")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      setLinksData(data);
    } catch (err) {
      const error = err as Error;
      toast.error(`Unable to fetch the links, ${error.message}`);
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <main className="flex h-max w-full flex-col gap-4 p-4">
      <header className="navbar sticky top-0 z-10 flex items-center justify-between bg-opacity-40 p-4 backdrop-blur-sm">
        <h1 className="text-3xl sm:text-4xl">Useful Links</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <AiOutlineSearch className="h-4 w-4" />
            </div>
            <input
              type="search"
              placeholder="Search a link"
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered input-primary block w-full rounded-lg bg-neutral p-4 pl-10 text-neutral-content"
            />
          </div>
          <label htmlFor="addmodal">
            <BsFilePlus className="h-4 w-4 cursor-pointer hover:text-accent sm:h-6 sm:w-6" />
          </label>
          <label
            className="cursor-pointer text-base-content transition-colors hover:text-accent lg:hidden"
            htmlFor="drawer"
          >
            <HiOutlineMenu className="h-6 w-6" />
          </label>
        </div>
      </header>
      {modalData && (
        <>
          <EditLinkModal
            id={modalData.id}
            title={modalData.title}
            link={modalData.link}
            user_id={user.id}
            getLinks={getLinks}
          />
          <DeleteLinkModal
            id={modalData.id}
            title={modalData.title}
            getLinks={getLinks}
          />
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/stop", permanent: false } };
  }

  supabase.auth.session = () => ({
    access_token: req.cookies["sb-access-token"] as string,
    token_type: "bearer",
    user,
  });

  const { data, error } = await supabase.rpc("get_is_portulover");
  if (!data) {
    return { props: {}, redirect: { destination: "/stop", permanent: false } };
  }

  if (error) {
    console.log(error);
  }

  return {
    props: { user },
  };
};
