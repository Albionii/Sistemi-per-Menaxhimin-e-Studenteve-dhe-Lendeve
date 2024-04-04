package com.connectToDatabase.ConnectToDatabase.notAcceptedUsername;

import java.io.*;
import java.util.HashMap;
import java.util.LinkedList;

public class checkForName {
    FileReader f;

    BufferedReader br;
    String a;
    public checkForName() throws IOException {
        f = new FileReader("src/main/java/com/connectToDatabase/ConnectToDatabase/BlackListedWords.txt");
        br = new BufferedReader(f);

    }
    //metoda kryesore qe merr fjalet nje nga nje prej bufferit dhe i shikon se inputi a permban nje fjale te pa lejuar
    public boolean isBadWord(String s) throws IOException{
            while ((a = br.readLine())!= null){
                if (s.contains(a)){
                    return closeBr(true);
                }
            }
        return closeBr(false);
    }

    //mbyll filereader edhe bufferedreader qe mbasi te kaloj tek iterimet e fjalve te ndyra te mos mbet pointeri ne fund (null)
    public boolean closeBr(boolean fjala) throws IOException{
        br.close();
        f = new FileReader("src/main/java/com/connectToDatabase/ConnectToDatabase/BlackListedWords.txt");
        br = new BufferedReader(f);
        return fjala;
    }
}
