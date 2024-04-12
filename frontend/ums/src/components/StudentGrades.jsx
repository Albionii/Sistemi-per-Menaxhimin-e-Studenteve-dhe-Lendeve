import NotaTable from "./NotaTable";

function StudentGrades (){
  return(
    <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-white ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Kodi
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Lenda
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Profesori
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Nota
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Statusi
                            </div>
                        </th>
                    </tr>
                </thead>

                  <NotaTable/>
                    
            </table>
        </div>

    </>
  )
}

export default StudentGrades;
