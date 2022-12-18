import type { FC } from "react";
import type { IGif } from "@giphy/js-types";

interface GifInfoModalProps {
  gif: IGif;
  onClose: () => void;
}
/**
 * The modal with the info about the gif and
 * the fields to copy the urls to the different variants
 * @example
 * <GifInfoModal
 *   gif={gif}
 *   onClose={() => {setIsModalOpen(false)}} />
 * @param gif The giphy gif object
 * @param onClose Modal close handler
 * @returns React component
 */
const GifInfoModal: FC<GifInfoModalProps> = ({ gif, onClose }) => (
  <>
    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
    <div
      data-testid="gif-info"
      className="modal modal-bottom sm:modal-middle modal-open"
      onClick={(clickEvent) => {
        if (clickEvent.target === clickEvent.currentTarget) {
          onClose();
        }
      }}
      key={gif.id}
    >
      <div className="modal-box relative">
        <h2 className="text-lg font-bold text-center">{gif.title}</h2>
        <div className="py-4">
          <img
            src={gif.images.original.webp}
            width={gif.images.original.width}
            height={gif.images.original.height}
            alt={gif.alt_text}
            className="block mx-auto max-w-full rounded"
          />

          <label className="input-group mt-4">
            <input
              type="text"
              id="input-gif"
              value={gif.images.original.url}
              className="input input-bordered w-full input-sm"
              readOnly
            />
            <span>GIF</span>
          </label>

          <label className="input-group mt-4">
            <input
              type="text"
              value={gif.images.original.webp}
              className="input input-bordered w-full input-sm"
              readOnly
            />
            <span>WebP</span>
          </label>

          <label className="input-group mt-4">
            <input
              type="text"
              value={gif.images.original.mp4}
              className="input input-bordered w-full input-sm"
              readOnly
            />
            <span>MP4</span>
          </label>
        </div>
      </div>
    </div>
  </>
);

export { GifInfoModal };
export type { GifInfoModalProps };
