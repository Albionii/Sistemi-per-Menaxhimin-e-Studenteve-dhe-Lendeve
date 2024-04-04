package com.connectToDatabase.ConnectToDatabase.notAcceptedUsername;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;

public class checkForName {
    FileReader f;

    static ArrayList<String> fjalet;
    BufferedReader br;
    String a;
    public checkForName() throws IOException {
        f = new FileReader("src/main/java/com/connectToDatabase/ConnectToDatabase/BlackListedWords.txt");
        br = new BufferedReader(f);
        fjalet = new ArrayList<String>();
        saveToArray();

    }
    //metoda kryesore qe merr fjalet nje nga nje prej ArrayList dhe i krahason se a eshte valide
    public boolean isBadWord(String s) throws IOException{
            for (int i = 0; i < fjalet.size(); i++) {
                if (s.contains(fjalet.get(i))){
                    return true;
                }
            }
            return false;
    }

    //merr fjalet prej bufferit nje nga nje dhe i ruan ne ArrayList
    public void saveToArray() throws IOException{
        while ((a = br.readLine())!= null) {
            fjalet.add(a);
        }
        closeBr();
    }

    //mbyll filereader edhe bufferedreader qe mbasi te kaloj tek iterimet e fjalve te ndyra te mos mbet pointeri ne fund (null)
    public void closeBr() throws IOException{
        br.close();
        f.close();
    }
}
