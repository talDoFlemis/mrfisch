import axios from "axios";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { BsBookmarkHeart } from "react-icons/bs";
import { toast } from "react-toastify";
interface AddToFavoriteBtnProps {
  session?: Session;
  favorited_by?: Session["user"][];
  codeId: string;
}

const AddToFavoriteBtn = ({
  session,
  favorited_by,
  codeId,
}: AddToFavoriteBtnProps) => {
  const [posting, setPosting] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const changeFavoriteSts = async (toFav: boolean) => {
    const data = {
      codeId,
      toFav,
    };
    try {
      setPosting(true);
      await axios.patch("/api/codes/favorite", data);
      setIsFav(!isFav);
    } catch (error) {
      const err = error as Error;
      toast.error(`Unable to favorite the code ${err.message}`);
    } finally {
      setPosting(false);
    }
  };

  const isFavorite = () => {
    return favorited_by?.find((fav) => fav.id === session?.user.id);
  };

  useEffect(() => {
    if (isFavorite()) setIsFav(true);
    else setIsFav(false);
  }, [favorited_by]);

  return (
    <>
      {session ? (
        <>
          {!isFav ? (
            <button
              className="gap-x-2 border-none transition-colors btn btn-error btn-sm hover:bg-error-content hover:text-error"
              onClick={() => changeFavoriteSts(true)}
              disabled={posting}
            >
              <div>Favorite</div>
              <BsBookmarkHeart className="w-5 h-5" aria-hidden="true" />
            </button>
          ) : (
            <button
              className="gap-x-2 border-none transition-colors btn btn-error btn-sm hover:bg-error-content hover:text-error"
              onClick={() => changeFavoriteSts(false)}
              disabled={posting}
            >
              <div>Unfavorite</div>
              <BsBookmarkHeart className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </>
      ) : (
        <button
          disabled
          aria-disabled
          className="gap-x-2 border-none btn btn-sm"
        >
          <div> Favorite</div>
          <BsBookmarkHeart className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
    </>
  );
};

export default AddToFavoriteBtn;
