import DashboardLayout from "@components/layout/DashboardLayout";
import AddLinkModal from "@components/portulovers/AddLinkModal";
import EditLinkModal from "@components/portulovers/EditLinkModal";
import LinkCard from "@components/portulovers/LinkCard";
import { GetServerSideProps } from "next";
import { ReactElement, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import { toast } from "react-toastify";
import { LinkInterface } from "typings";
import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useQuery } from "hooks/useQuery";
import DeleteModal from "@components/layout/DeleteModal";
import axios from "axios";
import { useSWRConfig } from "swr";
import { IoAddOutline } from "react-icons/io5";
import Image from "next/image";
import YuiGif from "../public/img/yui.gif";
import LoadingComponent from "@components/layout/LoadingComponent";

const Portulovers = () => {
  const [deleteModal, setDeleteModal] = useState({
    id: "",
    userId: "",
    isOpen: false,
  });
  const [editModal, setEditModal] = useState({
    isOpen: false,
    id: "",
    title: "",
    url: "",
  });
  const [addModal, setAddModal] = useState(false);
  const [search, setSearch] = useState<string>("");
  const { data: links, error } = useQuery<LinkInterface[]>("/api/links", false);
  const { mutate } = useSWRConfig();

  if (error) {
    toast.error(`Unable to fetch links, ${error.message}`);
  }

  const addLink = async (data: { url: string; title: string }) => {
    try {
      const resp = await axios.post("/api/links", data);
      mutate(
        "/api/links",
        async (links: LinkInterface[]) => {
          links.unshift(resp.data);
          return links;
        },
        { revalidate: false }
      );
      toast.success("Link was added with success");
    } catch (err) {
      const error = err as Error;
      toast.error(`Unable to add the link, ${error.message}`);
    } finally {
      setAddModal(false);
    }
  };

  const editLink = async (data: { id: string; url: string; title: string }) => {
    try {
      const resp = await axios.patch("/api/links", data);
      mutate(
        "/api/links",
        async (links: LinkInterface[]) => {
          const filteredLinks = links.filter((link) => link.id !== data.id);
          filteredLinks.unshift(resp.data);
          return filteredLinks;
        },
        { revalidate: false }
      );
      toast.success("Link was deleted with success");
    } catch (err) {
      const error = err as Error;
      toast.error(`Unable to edit the link, ${error.message}`);
    } finally {
      setEditModal({ ...editModal, isOpen: false });
    }
  };

  const deleteLink = async (data: { id: string; userId: string }) => {
    try {
      await axios.delete("/api/links", { data: data });
      mutate(
        "/api/links",
        async (links: LinkInterface[]) => {
          const filteredLinks = links.filter((link) => link.id !== data.id);
          return filteredLinks;
        },
        { revalidate: false }
      );

      toast.success("Link was deleted with success");
    } catch (err) {
      const error = err as Error;
      toast.error(`Unable to delete the link, ${error.message}`);
    } finally {
      setDeleteModal({ ...deleteModal, isOpen: false });
    }
  };

  return (
    <main className="flex flex-col gap-4 p-4 w-full h-max">
      <Head>
        <title>Portulovers • Mr Fisch</title>
      </Head>
      <header className="flex sticky top-0 z-10 justify-between items-center p-4 bg-opacity-40 navbar backdrop-blur-sm">
        <h1 className="text-4xl font-geo">Useful Links</h1>
        <div className="flex gap-4 items-center">
          <div className="hidden relative sm:inline-flex">
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
          <button
            className="text-sm btn btn-primary btn-sm font-geo"
            onClick={() => setAddModal(true)}
          >
            <IoAddOutline className="w-6 h-6" aria-hidden />
            Add
          </button>
          <label
            className="transition-colors cursor-pointer lg:hidden text-base-content hover:text-accent"
            htmlFor="drawer"
          >
            <HiOutlineMenu className="w-6 h-6" />
          </label>
        </div>
      </header>
      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        postOperation={deleteLink}
        title={"Are you sure U want to delete this link"}
      />
      <EditLinkModal
        id={editModal.id}
        title={editModal.title}
        url={editModal.url}
        postOperation={editLink}
        editModal={editModal}
        setEditModal={setEditModal}
      />
      <AddLinkModal
        addModal={addModal}
        setAddModal={setAddModal}
        postOperation={addLink}
      />
      {!links && !error ? (
        <div className="flex justify-center items-center h-3/5">
          <LoadingComponent className="w-16 h-16 text-accent" />
        </div>
      ) : links?.length !== 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links
            ?.filter((link) => {
              if (search === "") {
                return link;
              } else if (
                link.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return link;
              }
            })
            .map((link) => (
              <LinkCard
                id={link.id}
                key={link.id}
                title={link.title}
                url={link.url}
                inserted_at={link.inserted_at}
                updated_at={link.updated_at}
                user={link.user}
                setDeleteModal={setDeleteModal}
                setEditModal={setEditModal}
              />
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-y-2 justify-center items-center text-center">
          <h3 className="mx-auto text-2xl font-geo">No links found</h3>
          <div className="relative w-52 h-40">
            <Image
              src={YuiGif}
              layout="fill"
              objectFit="contain"
              alt="yui gif"
            />
          </div>
          <p className="mx-auto text-xl font-geo">
            Click on the ADD link button to add a new link
          </p>
        </div>
      )}
    </main>
  );
};

Portulovers.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Portulovers;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session || session.user.role === "NORMAL") {
    return {
      redirect: {
        destination: "/stop",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
