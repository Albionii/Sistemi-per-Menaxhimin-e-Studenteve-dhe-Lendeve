import NotaTable from "./NotaTable";

function StudentGrades (){
  return(
    <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-white ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 text-white text-center">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Kodi
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="">
                                Lenda
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div >
                                Profesori
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div>
                                Nota
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div>
                                Statusi
                            </div>
                        </th>
                        
                        <th scope="col" className="px-6 py-3">
                            <div>
                                Fshije Provimin
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
