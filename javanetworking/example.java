private static void task2() {
    DatagramSocket socket;
    int destPort = 5656;
    int srcPort = 6221;
    try {
        socket = new DatagramSocket(srcPort);
        InetAddress destAddr = InetAddress.getByName("alice.hopto.org");

        String message = "WADDUP!!";

        DatagramPacket txPacket = new DatagramPacket(message.getBytes(), message.getBytes().length, destAddr, 5656);

        socket.send(txPacket);
        System.out.println("Sent Message: " + message + "to destination: " + destAddr);

        System.out.println("Waiting on response");

        byte rxBuf[] = new byte[1500];
        DatagramPacket rxPacket = new DatagramPacket(rxBuf, rxBuf.length);
        socket.receive(rxPacket);
        String sentence = new String(rxPacket.getData());
        System.out.println("RECEIVED: " + sentence);
        System.out.println("From Address: " + rxPacket.getAddress());
        System.out.println("From Port: " + rxPacket.getPort());


    } catch (SocketException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
    } catch (IOException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
    }
}

