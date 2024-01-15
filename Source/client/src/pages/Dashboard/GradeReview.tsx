import { Link, useParams } from 'react-router-dom';
import Review from './Review';
import { useEffect, useState } from 'react';
import { getGradesByIdClassAndIdClassStudent } from '../../services/classApi';

const GradeReview = () => {
  const { idClass } = useParams<{ idClass: string }>();
  const { idClassStudent } = useParams<{ idClassStudent: string }>();
  const [ grades, setGrades ] = useState<any[]>([]);

  useEffect(() => {
    getGradesByIdClassAndIdClassStudent(Number(idClass), Number(idClassStudent)).then((res: any) => {
        setGrades(res);
    });
  }, [])

  return (
    <>
        <div className="col-span-12 md:mt-6">
            <div className="flex space-x-4">
                <Link className="hover:underline" to={`/class/${idClass}/dashboard`}>Dashboard</Link>
                <Link className="hover:underline" to={`/class/${idClass}/members`}>Members</Link>
                <Link className="hover:underline" to={`/class/${idClass}/grade-stucture`}>Grade Structure</Link>
                <Link className="hover:underline" to={`/class/${idClass}/grade-board`}>Gradeboard</Link>
            </div>
            <hr className='md:mb-6'/>
        </div>
        {grades.map((grade: any, index: number) => (
            <Review key={index} idGradeReview={Number(grade.id_grade_review)} idClassStudent={Number(idClassStudent)} idClass={Number(idClass)} gradeCompositionId={grade.id_grade_composition} gradeName={grade.grade_name} title={grade.review_title} explanation={grade.student_explanation} expectationGrade={grade.student_expectation_grade}/>
          )
        )}
    </>
  );
};

export default GradeReview;