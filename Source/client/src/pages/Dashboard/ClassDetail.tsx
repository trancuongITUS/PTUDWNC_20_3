import { Link, useParams } from 'react-router-dom';

const ClassDetail = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12">
          <div className="flex space-x-4">
            <Link className="hover:underline" to={`/class/${id}/dashboard`}>Dashboard</Link>
            <Link className="hover:underline" to={`/class/${id}/members`}>Members</Link>
            <Link className="hover:underline" to={`/class/${id}/grade-stucture`}>Grade Structure</Link>
            <Link className="hover:underline" to={`/class/${id}/grade-board`}>Gradeboard</Link>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default ClassDetail;