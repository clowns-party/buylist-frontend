import Link from "next/link";
import { EmptyIcon } from "shared/icons";
import { Routes } from "shared/routes";
import Button from "shared/ui/Button";

const EmptyList = () => {
  return (
    <section className="max-w-lg px-4 py-12 mx-auto">
      <img className="mx-auto sm:w-1/4" src={EmptyIcon.src} />
      <h2 className="mt-2 text-lg font-medium text-center text-gray-800">
        Here you will manage your buylists.
      </h2>
      <p className="mt-1 text-center text-gray-600">
        Create a buylist so as not to miss the most important thing.
      </p>
      <div className="flex flex-col items-center justify-center mt-4 space-y-1 md:flex-row md:space-y-0 md:space-x-1">
        <Link href={Routes.createBuylist}>
          <a href={Routes.createBuylist}>
            <Button>Create now</Button>
          </a>
        </Link>
      </div>
    </section>
  );
};
export default EmptyList;
